import { useRef, useEffect, useState, useContext } from "react";
import cn from "classnames";
import axios from "axios";
import { Drawer } from "vaul";
import { AnimatePresence, motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
import * as Slider from "@radix-ui/react-slider";
import { SongIdsContext } from "./SongIdsContext";
import { useRouter } from "next/router";
import site from "@/lib/site.config";
import { HeartFill } from "../icons/HeartFillIcon";
import { Heart } from "../icons/HeartIcon";
import { Previous } from "../icons/PreviousIcon";
import { Loop } from "../icons/LoopIcon";
import { Order } from "../icons/OrderIcon";
import { Pause } from "../icons/PauseIcon";
import { Play } from "../icons/PlayIcon";
import { Next } from "../icons/NextIcon";
import { Shuffle } from "../icons/ShuffleIcon";
import { ChevronDown } from "../icons/ChevronDownIcon";
import { Lyrics } from "../icons/LyricsIcon";

export default function Player() {
  const [lyrics, setLyrics] = useState([]);
  const [isFull, setIsFull] = useState("false");
  const [highlightedLine, setHighlightedLine] = useState("");
  const [highlightedLineTimestamp, setHighlightedLineTimestamp] = useState("");
  const {
    isPlaying,
    setIsPlaying,
    songIds,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(SongIdsContext);
  const [playMode, setPlayMode] = useState("default"); // 默认为顺序播放模式
  const [translatedLyrics, setTranslatedLyrics] = useState([]);
  const [songInfo, setSongInfo] = useState([]);
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => {
    const storedCurrentTime = localStorage.getItem("playedTime");
    return storedCurrentTime !== 0 ? parseFloat(storedCurrentTime) : 0;
  });
  const [remainingTime, setRemainingTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [display, setDisplay] = useState(() => {
    const storedDisplay = localStorage.getItem("display");
    return storedDisplay !== null ? JSON.parse(storedDisplay) : true; // 设置默认值为true
  });
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [hasLoadedPlaybackTime, setHasLoadedPlaybackTime] = useState(false);

  useEffect(() => {
    const storedCurrentTime = localStorage.getItem("playedTime");
    setCurrentTime(
      storedCurrentTime !== null ? parseFloat(storedCurrentTime) : 0
    );
    // 将hasLoadedPlaybackTime设置为true，表示已经从localStorage中读取了播放时间
    setHasLoadedPlaybackTime(true);
  }, []);

  useEffect(() => {
    // 判断是否已经从localStorage中读取了播放时间
    if (hasLoadedPlaybackTime) {
      audioRef.current.seekTo(currentTime);
    }
  }, [hasLoadedPlaybackTime]);

  useEffect(() => {
    const storedIsPlaying = localStorage.getItem("isPlaying");
    const storedCurrentTime = localStorage.getItem("playedTime");

    setIsPlaying(storedIsPlaying ? JSON.parse(storedIsPlaying) : false);

    setCurrentTime(storedCurrentTime ? parseFloat(storedCurrentTime) : 0);

    localStorage.setItem("currentSongIndex", JSON.stringify(currentSongIndex));

    return () => {
      localStorage.setItem("playedTime", currentTime.toString());
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("isPlaying", JSON.stringify(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem("playedTime", currentTime.toString());
  }, [currentTime]);

  useEffect(() => {
    audioRef.current.seekTo(currentTime);
  }, []);

  useEffect(() => {
    const savedPlayedTime = localStorage.getItem("playedTime");
    if (savedPlayedTime) {
      const parsedTime = parseFloat(savedPlayedTime);
      setPlayed(parsedTime);
      setCurrentTime(parsedTime);
      audioRef.current.seekTo(parsedTime);
    }
  }, []);

  useEffect(() => {
    if (currentSongIndex >= songIds.length) {
      setCurrentSongIndex(0);
    }
  }, [songIds]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 766) {
        setDisplay(false);
      } else {
        setDisplay(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const currentSongId = songIds[currentSongIndex];

        const [songResponse, lyricsResponse, translatedLyricsResponse] =
          await Promise.all([
            axios.get(`${site.api}/song/detail?ids=${currentSongId}`),
            axios.get(`${site.api}/lyric?id=${currentSongId}`),
            axios.get(`${site.api}/lyric/translate?id=${currentSongId}`),
          ]);

        const songData = songResponse.data;
        const songDetail = songData.songs;
        setSongInfo(songDetail);

        const lyricsData = lyricsResponse.data;
        const lyricsText = lyricsData.lrc.lyric;
        const parsedLyrics = parseLyrics(lyricsText);
        setLyrics(parsedLyrics);

        const translatedLyricsData = translatedLyricsResponse.data;
        const translatedLyricsText = translatedLyricsData.tlyric.lyric;
        const parsedTranslatedLyrics = parseLyrics(translatedLyricsText);
        setTranslatedLyrics(parsedTranslatedLyrics);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSongData();
  }, [songIds, currentSongIndex]);

  const parseLyrics = (lyricsText) => {
    const lines = lyricsText.split("\n");
    const parsedLyrics = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.length > 0) {
        const regex = /\[(\d+):(\d+)\.\d+\]/;
        const match = line.match(regex);

        if (match) {
          const [, minutes, seconds] = match;
          const currentTimeInSeconds =
            parseInt(minutes) * 60 + parseInt(seconds);

          parsedLyrics.push({
            timestamp: currentTimeInSeconds,
            text: line.replace(regex, "").trim(),
          });
        }
      }
    }

    return parsedLyrics;
  };

  const handleTimeUpdate = ({ playedSeconds }) => {
    if (!lyrics.length || !audioRef.current || !lyricsContainerRef.current) {
      return;
    }

    const matchingLines = [];

    for (let i = 0; i < lyrics.length; i++) {
      const { timestamp, text } = lyrics[i];
      const diff = Math.abs(playedSeconds - timestamp);

      if (playedSeconds >= timestamp) {
        matchingLines.push({
          text,
          diff,
          timestamp,
        });
      }
    }

    matchingLines.sort((a, b) => a.diff - b.diff);
    const currentHighlightedLine = matchingLines[0]?.text || null;
    const currentHighlightedLineTimestamp = matchingLines[0]?.timestamp || null;

    setHighlightedLine(currentHighlightedLine);
    setHighlightedLineTimestamp(currentHighlightedLineTimestamp);
  };

  useEffect(() => {
    if (
      typeof highlightedLineTimestamp === "number" &&
      lyricsContainerRef.current
    ) {
      const targetElement = lyricsContainerRef.current.querySelector(
        `p[data-text="${String(highlightedLineTimestamp)}"]`
      );

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [highlightedLineTimestamp]);

  const handleProgress = (progress) => {
    const playedTime = progress.playedSeconds;
    setPlayed(progress.played);
    setCurrentTime(playedTime);
    setRemainingTime(audioRef.current.getDuration() - playedTime);
    localStorage.setItem("playedTime", playedTime.toString());
  };

  useEffect(() => {
    const storedCurrentTime = localStorage.getItem("playedTime");
    setCurrentTime(
      storedCurrentTime !== null ? parseFloat(storedCurrentTime) : 0
    );
  }, []);

  useEffect(() => {
    audioRef.current.seekTo(currentTime);
  }, []);

  const handleSeekChange = (newValue) => {
    setSeekValue(parseFloat(newValue));
  };

  const handleSeek = () => {
    audioRef.current.seekTo(seekValue);
  };

  useEffect(() => {
    if (audioRef.current && audioRef.current.getDuration() && played === 1) {
      setPlayed(0);
      setIsPlaying(false);
    }
  }, [played]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (newValue) => {
    const newVolume = parseFloat(newValue);
    setVolume(newVolume);
  };

  function shuffleArray(array) {
    const newArray = [...array]; // 创建一个新数组，并复制原始数组的元素

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 交换位置
    }

    return newArray;
  }

  const handleEnded = () => {
    if (playMode === "default") {
      // 播放下一首音频
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songIds.length);
      setIsPlaying(true);
    } else if (playMode === "loop") {
      // 继续播放当前音频
      audioRef.current.seekTo(0);
      setIsPlaying(true);
    } else if (playMode === "shuffle") {
      // 创建一个随机排列的数组
      const shuffledIndexes = shuffleArray(
        Array.from({ length: songIds.length }, (_, i) => i)
      );
      // 获取当前音频索引
      const currentIndex = shuffledIndexes.findIndex(
        (index) => index === currentSongIndex
      );
      // 播放下一首随机音频
      setCurrentSongIndex(
        shuffledIndexes[(currentIndex + 1) % shuffledIndexes.length]
      );
      setIsPlaying(true);
    }
  };

  const { getAllSongIds } = useContext(SongIdsContext);
  const songId = songIds[currentSongIndex];
  const userDataStr = localStorage.getItem("userData");
  const userData = JSON.parse(userDataStr);
  const cookie = localStorage.getItem("cookie");

  useEffect(() => {
    if (userData) {
      checkLikedMusic(userData.data.account.id, songId);
    }
  }, [songId]);

  useEffect(() => {
    localStorage.setItem("isLiked", isLiked); // 每次 isLiked 更新后保存到本地存储
  }, [isLiked]);

  const checkLikedMusic = async (userId, songId) => {
    try {
      const response = await axios.get(
        `${site.api}/likelist?uid=${userId}&cookie=${cookie}`
      );

      if (response.data.code === 200) {
        const likedMusicIds = response.data.ids;
        const isLiked = likedMusicIds.includes(songId);
        setIsLiked(isLiked);
      } else {
        console.log("获取喜欢音乐列表失败");
      }
    } catch (error) {
      console.error(error);
      // 处理错误情况
    }
  };

  const toggleLikeMusic = async () => {
    try {
      setIsLiked(!isLiked); // 直接更新喜欢状态，不等待服务器响应

      const response = await axios.get(`${site.api}/like`, {
        params: {
          id: songId,
          like: !isLiked, // 反转当前的喜欢状态
          cookie: cookie,
        },
      });

      if (response.data.code !== 200) {
        console.log("喜欢失败");
      }
    } catch (error) {
      console.error(error);
      // 处理错误情况
    }
  };

  if ("mediaSession" in navigator) {
    useEffect(() => {
      if (songInfo) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: `${songInfo.map((song) => song.name)}`,
          artist: `${songInfo.map((song) =>
            song.ar.map((artist) => artist.name).join(" / ")
          )}`,
          artwork: [
            {
              src: `${songInfo.map((song) => song.al.picUrl)}`,
              sizes: "300x300",
              type: "image/jpeg",
            },
          ],
        });
      }

      navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler("pause", () =>
        setIsPlaying(false)
      );
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        setCurrentSongIndex(
          (currentSongIndex - 1 + songIds.length) % songIds.length
        )
      );
      navigator.mediaSession.setActionHandler("nexttrack", () =>
        setCurrentSongIndex((currentSongIndex + 1) % songIds.length)
      );
    }, [currentSongIndex, songInfo]);
  }
  return (
    <div>
      <div>
        <ReactPlayer
          ref={audioRef}
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(error) => {
            setCurrentSongIndex(currentSongIndex + 1);
          }}
          volume={volume}
          url={`https://music.163.com/song/media/outer/url?id=${songIds[currentSongIndex]}.mp3`}
          onProgress={(progress) => {
            handleTimeUpdate(progress);
            handleProgress(progress);
          }}
          onEnded={handleEnded}
          className="fixed top-0 hidden"
        />
      </div>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button
            type="button"
            className="text-base bg-neutral-200 dark:bg-neutral-800 truncate rounded-lg px-1 py-0 cursor-pointer text-neutral-600 dark:text-neutral-400"
          >
            <div className="flex flex-row space-x-2 max-w-[36rem] sm:max-w-[16rem] w-auto">
              {songIds[currentSongIndex] == "" ? (
                "未在播放"
              ) : (
                <div>
                  {songInfo.map((song) => (
                    <div className="flex flex-row py-1">
                      <img
                        src={`${song.al.picUrl}?param=448y448`}
                        className="w-8 h-8 rounded-lg"
                      />
                      <div className="flex flex-col text-xs px-1 text-left">
                        <p className="truncate w-16 my-0">{song.name}</p>
                        <p className="opacity-75 truncate w-16 my-0">
                          {song.ar.map((artist) => artist.name).join(" / ")}
                        </p>
                      </div>
                      <div className="flex flex-row space-x-1 max-w-[16rem] mt-2">
                        <button>
                          <button
                            onClick={(event) => {
                              setCurrentSongIndex(
                                (currentSongIndex - 1 + songIds.length) %
                                  songIds.length
                              );
                              event.stopPropagation();
                            }}
                          >
                            <Previous isFull="false" />
                          </button>
                          <motion.button
                            initial={{ scale: 1 }}
                            animate={{
                              scale: isPlaying ? [0.85, 1] : [1, 0.85],
                              transition: {
                                type: "spring",
                                stiffness: 220,
                                damping: 10,
                              },
                            }}
                            onClick={(event) => {
                              setIsPlaying(!isPlaying);
                              event.stopPropagation();
                            }}
                          >
                            {isPlaying === true ? (
                              <Pause isFull="false" />
                            ) : (
                              <Play isFull="false" />
                            )}
                          </motion.button>
                          <button
                            onClick={(event) => {
                              setCurrentSongIndex(
                                (currentSongIndex + 1) % songIds.length
                              );
                              event.stopPropagation();
                            }}
                          >
                            <Next isFull="false" />
                          </button>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 dark:bg-white/10 backdrop-blur-3xl" />
          <Drawer.Content className="z-[9999] bg-white dark:bg-black flex flex-col rounded-t-xl h-screen mt-24 fixed bottom-0 left-0 right-0 border-neutral-200 dark:border-neutral-800 focus:outline-none">
            <div className="p-4 bg-white dark:bg-black flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700 mb-8" />
              <div className="w-full flex flex-row">
                <div className="w-full md:w-1/2 sm:w-1/2 px-4 md:px-6 sm:px-36 py-2">
                  {songInfo.map((song) => (
                    <div>
                      <img
                        src={`${song.al.picUrl}?param=448y448`}
                        className="rounded-xl w-full h-auto md:w-80 md:h-80 sm:w-96 sm:h-96"
                      />

                      <div className="flex flex-row justify-between w-full md:w-80 sm:w-96">
                        <div className="flex flex-col text-lg font-medium mt-4 px-2 py-1.5 space-y-0.5">
                          <h1>{song.name}</h1>
                          <h2 className="opacity-75">
                            {song.ar.map((artist) => artist.name).join(" / ")}
                          </h2>
                        </div>
                        <button onClick={toggleLikeMusic}>
                          {isLiked ? <HeartFill /> : <Heart />}
                        </button>
                      </div>

                      <div className="w-full md:w-80 sm:w-96 px-2">
                        <Slider.Root
                          className="SliderRoot"
                          min={0}
                          max={1}
                          step={0.01}
                          value={[played]}
                          onValueChange={(newValue) =>
                            handleSeekChange(newValue)
                          }
                          onPointerUp={handleSeek}
                        >
                          <Slider.Track className="SliderTrack mt-4 backdrop-blur-lg bg-opacity-75 cursor-pointer">
                            <Slider.Range
                              className={cn(
                                "SliderRange cursor-pointer",
                                played === 0
                                  ? "rounded-l-full"
                                  : "rounded-none",
                                played === 1 ? "rounded-full" : "rounded-l-full"
                              )}
                            />
                            <Slider.Thumb
                              className="SliderThumb focus:outline-none -mt-1"
                              aria-label="Progress"
                            />
                          </Slider.Track>
                        </Slider.Root>

                        <div className="flex mx-auto mt-3 flex-row justify-between font-medium">
                          <div className="text-xs md:text-sm sm:text-sm opacity-75">
                            {formatTime(currentTime)}
                          </div>
                          <div className="text-xs md:text-sm sm:text-sm opacity-75">
                            -{formatTime(remainingTime)}
                          </div>
                        </div>

                        <div className="flex flex-row justify-between mt-4">
                          <div
                            className={cn(
                              "transition-all duration-500 flex flex-row mt-4"
                            )}
                          >
                            <button
                              onClick={() =>
                                setPlayMode(
                                  playMode === "default" ? "loop" : "default"
                                )
                              }
                              className={cn(
                                "px-1",
                                playMode === "loop" &&
                                  "bg-neutral-200/50 dark:bg-neutral-600/50 rounded-md"
                              )}
                            >
                              {playMode !== "loop" && <Order />}
                              {playMode === "loop" && <Loop />}
                            </button>
                          </div>

                          <div
                            className={cn(
                              "transition-all duration-500",
                              isFull === "true"
                                ? "mx-auto mt-4 mb-4 w-1/2 z-30"
                                : "w-full"
                            )}
                          >
                            <div className="px-8 md:px-16 sm:px-16 mx-auto flex flex-row justify-between transition-all duration-500">
                              <button
                                onClick={() =>
                                  setCurrentSongIndex(
                                    (currentSongIndex - 1 + songIds.length) %
                                      songIds.length
                                  )
                                }
                              >
                                <Previous isFull='true' />
                              </button>
                              <motion.button
                                initial={{ scale: 1 }}
                                animate={{
                                  scale: isPlaying ? [0.85, 1] : [1, 0.85],
                                  transition: {
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 10,
                                  },
                                }}
                                onClick={() => setIsPlaying(!isPlaying)}
                              >
                                {isPlaying === true ? (
                                  <Pause isFull='true' />
                                ) : (
                                  <Play isFull='true' />
                                )}
                              </motion.button>
                              <button
                                onClick={() =>
                                  setCurrentSongIndex(
                                    (currentSongIndex + 1) % songIds.length
                                  )
                                }
                              >
                                <Next isFull='true' />
                              </button>
                            </div>
                          </div>

                          <div
                            className={cn(
                              "transition-all duration-500 flex flex-row mt-4"
                            )}
                          >
                            <button
                              onClick={() =>
                                setPlayMode(
                                  playMode === "shuffle" ? "default" : "shuffle"
                                )
                              }
                              className={cn(
                                "px-1",
                                playMode === "shuffle" &&
                                  "bg-neutral-200/50 dark:bg-neutral-600/50 rounded-md"
                              )}
                            >
                              <Shuffle playMode={playMode} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block sm:block w-1/2 h-[85vh] overflow-y-auto">
                  <div className="py-4 overflow-y-auto select-none">
                    <div ref={lyricsContainerRef} style={{ maxHeight: "100%" }}>
                      {lyrics.map((line, index) => {
                        const translationLine = translatedLyrics.find(
                          (translatedLine) =>
                            translatedLine.timestamp === line.timestamp &&
                            line.text !== ""
                        );
                        const highlightedIndex = lyrics.findIndex(
                          (lyric) =>
                            lyric.text === highlightedLine &&
                            lyric.timestamp === highlightedLineTimestamp
                        );
                        const isHighlightedRow = index === highlightedIndex;
                        return (
                          <p
                            key={index}
                            className={cn(
                              "font-medium text-[1.75rem] md:text-[2.1rem] sm:text-[2.8rem]  flex flex-col space-y-1 tracking-tighter cursor-pointer px-2.5 md:px-0 sm:px-0 py-4 md:py-7 sm:py-10 leading-normal",
                              isHighlightedRow &&
                                highlightedIndex !== -1 &&
                                "text-3xl md:text-3xl sm:text-4xl blur-0",
                              !isHighlightedRow && "opacity-50 "
                            )}
                            onClick={() =>
                              audioRef.current.seekTo(line.timestamp)
                            }
                            data-text={String(line.timestamp)}
                          >
                            <span className="mb-1 md:mb-2 sm:mb-2 leading-normal break-words hyphens-auto">
                              {line.text ? <>{line.text}</> : <></>}
                            </span>
                            {translationLine?.text && (
                              <span className="text-2xl md:text-2xl sm:text-3xl text-neutral-700 dark:text-neutral-300 font-medium leading-normal">
                                {translationLine.text}
                              </span>
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
