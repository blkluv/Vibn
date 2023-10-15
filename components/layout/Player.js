import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
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

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Player() {
  const router = useRouter();
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
  const {
    addToPlaylist,
    removeFromPlaylist,
    currentTrackIndex,
    setCurrentTrackIndex,
  } = useContext(SongIdsContext);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [hasLoadedPlaybackTime, setHasLoadedPlaybackTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(-1);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [closeTimer, setCloseTimer] = useState(null);
  const handleTimingCloseClick = () => {
    setShowTimeMenu(true); // 点击 "定时关闭" 时显示第二个 Menu
  };

  useEffect(() => {
    if (selectedTime !== "") {
      clearTimeout(closeTimer);

      const newCloseTimer = setTimeout(() => {
        setIsPlaying(false);
      }, parseInt(selectedTime) * 60 * 1000);

      setCloseTimer(newCloseTimer);
    }
  }, [selectedTime]);

  const handleSelectTime = (event) => {
    setSelectedTime(event.target.value);

    clearTimeout(closeTimer);
    setIsPlaying(true);
  };

  const timeOptions = [
    { label: "无限制", value: "" },
    { label: "1分钟", value: "1" },
    { label: "5分钟", value: "5" },
    { label: "15分钟", value: "15" },
    { label: "30分钟", value: "30" },
    { label: "45分钟", value: "45" },
    { label: "60分钟", value: "60" },
    { label: "120分钟", value: "120" },
  ];

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
    <div className="transition-all duration-500 fixed w-full max-h-screen z-[10000]">
      <div></div>
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

      <motion.div
        initial={{ y: 0, borderRadius: 0 }}
        transition={{
          type: "spring",
          duration: 0.75,
        }}
        className={cn(
          "fixed transition-all duration-500",
          isFull === "true"
            ? "z-[99999] top-0 w-full h-screen"
            : "bottom-0 w-full md:w-5/6 sm:w-5/6 right-0 px-0"
        )}
      >
        <div className="transition-all duration-500">
          {songInfo.map((song) => (
            <img
              key={song.id}
              src={song.al.picUrl}
              alt="Album Cover"
              className={cn(
                "transition-all duration-500",
                isFull === "true"
                  ? "bg-no-repeat absolute h-screen z-[-1] left-0 top-0 inset-x-0 right-0 w-full"
                  : "hidden"
              )}
            />
          ))}
        </div>
        <div
          className={cn(
            "transition-all duration-500 flex flex-row overflow-y-hidden md:overflow-y-auto sm:overflow-y-auto",
            isFull === "true"
              ? "bg-neutral-100/75 dark:bg-neutral-900/75 backdrop-blur-3xl h-screen"
              : "w-full overflow-x-auto bg-white dark:bg-black"
          )}
        >
          <div
            className={cn(
              "transition-all duration-500 select-none bottom-0 ",
              !display
                ? "top-0 md:top-0 sm:top-0 w-screen"
                : "fixed md:relative sm:relative bottom-0 md:top-0",
              isFull === "true"
                ? "z-[999999] min-h-screen w-full md:w-1/2 sm:w-1/2 overflow-y-auto left-0 right-0 "
                : "w-full md:w-5/6 sm:w-5/6 right-0 z-50"
            )}
          >
            {songInfo.map((song) => (
              <div
                key={song.id}
                className={cn(
                  "transition-all duration-500",
                  isFull === "true"
                    ? "mx-auto flex flex-col h-screen px-6 md:px-8 sm:px-0"
                    : "flex flex-row px-0 md:px-4 sm:px-4 py-2 md:py-2.5 sm:py-3"
                )}
              >
                <div
                  key={song.id}
                  className={cn(
                    "transition-all duration-500",
                    isFull === "true"
                      ? "mx-auto"
                      : "ml-4 md:ml-6 sm:ml-6 flex flex-row space-x-4"
                  )}
                >
                  <button
                    className={cn(
                      "transition-all duration-500 z-[10000000] text-center mx-auto fixed top-0 md:top-4 sm:top-4 md:right-16 sm:right-20 hidden md:block sm:block",
                      isFull === "true" ? "flex" : "hidden"
                    )}
                    onClick={() =>
                      setIsFull(isFull === "true" ? "false" : "true")
                    }
                  >
                    <ChevronDown display={display} isFull={isFull} />
                  </button>
                  <button
                    className={cn(
                      "transition-all duration-500 z-[10000000] text-center mx-auto block md:hidden sm:hidden",
                      isFull === "true" ? "flex" : "hidden"
                    )}
                    onClick={() =>
                      setIsFull(isFull === "true" ? "false" : "true")
                    }
                  >
                    <ChevronDown display={display} isFull={isFull} />
                  </button>
                  <motion.img
                    src={`${song.al.picUrl}?param=448y448`}
                    alt="Album Cover （PC）"
                    initial={{ scale: 1 }}
                    animate={
                      isFull == "true"
                        ? { scale: isPlaying ? 1 : 0.9 }
                        : { scale: 1 }
                    }
                    onClick={() => setIsFull("true")}
                    className={cn(
                      "rounded-xl transition-all duration-500",
                      display ? "hidden md:block sm:block" : "hidden",
                      isFull === "true"
                        ? "mt-8 mx-auto w-auto md:w-[22.5rem] sm:w-[25.5rem] "
                        : "w-12 h-12 md:w-14 md:h-14 sm:w-16 sm:h-16 cursor-pointer"
                    )}
                  />
                  <motion.img
                    src={`${song.al.picUrl}?param=448y448`}
                    alt="Album Cover （Mobile）"
                    initial={{ scale: 1 }}
                    animate={
                      isFull == "true"
                        ? { scale: isPlaying ? 1 : 0.9 }
                        : { scale: 1 }
                    }
                    onClick={() => setIsFull("true")}
                    className={cn(
                      "mx-auto w-auto md:w-[26rem] sm:w-[28rem] object-contain item-center rounded-xl transition-all duration-500",
                      !display
                        ? "opacity-100 z-0"
                        : "block md:hidden sm:hidden pointer-events-none select-none opacity-0 z-[-2]",
                      isFull === "true"
                        ? "mt-2 mx-auto w-auto md:w-[26rem] sm:w-[28rem] "
                        : "w-12 h-12 md:w-14 md:h-14 sm:w-16 sm:h-16 mt-2 cursor-pointer"
                    )}
                  />
                  <div
                    className={cn(
                      isFull === "true"
                        ? "w-auto md:w-[22.5rem] sm:w-[25.5rem]"
                        : "w-auto md:w-56 sm:w-60",
                      "flex flex-row justify-between z-[99999]"
                    )}
                  >
                    <div>
                      <h1
                        className={cn(
                          "font-medium truncate",
                          isFull === "true"
                            ? "w-64 md:w-80 sm:w-[23.5rem] text-lg md:text-xl sm:text-xl mt-6"
                            : "w-20 md:w-32 sm:w-36 text-base md:text-lg sm:text-lg mt-1"
                        )}
                      >
                        {song.name}
                      </h1>
                      <h2
                        className={cn(
                          "opacity-75  truncate",
                          isFull === "true"
                            ? "w-64 md:w-80 sm:w-[23.5rem] text-lg md:text-xl sm:text-xl"
                            : "w-20 md:w-32 sm:w-36 text-base md:text-lg sm:text-lg"
                        )}
                      >
                        {song.ar.map((artist) => artist.name).join(" / ")}
                      </h2>
                    </div>
                    <div
                      className={cn(
                        "flex flex-row space-x-4",
                        isFull === "true" ? "mt-9" : "mt-2 md:mt-1 sm:mt-2"
                      )}
                    >
                      <button
                        onClick={() => setDisplay(!display)}
                        className={cn(
                          isFull === "true"
                            ? "block md:hidden sm:hidden"
                            : "hidden"
                        )}
                      >
                        <Lyrics />
                      </button>
                      <button onClick={toggleLikeMusic}>
                        {isLiked ? <HeartFill /> : <Heart />}
                      </button>
                    </div>
                  </div>

                  <Slider.Root
                    className={cn(
                      "transition-all duration-500 SliderRoot ",
                      isFull === "true"
                        ? "mx-auto"
                        : "hidden w-0 pointer-events-none z-0"
                    )}
                    min={0}
                    max={1}
                    step={0.01}
                    value={[played]}
                    onValueChange={(newValue) => handleSeekChange(newValue)}
                    onPointerUp={handleSeek}
                  >
                    <Slider.Track className="SliderTrack mt-4 backdrop-blur-lg bg-opacity-75 cursor-pointer">
                      <Slider.Range
                        className={cn(
                          "SliderRange cursor-pointer",
                          played === 0 ? "rounded-l-full" : "rounded-none",
                          played === 1 ? "rounded-full" : "rounded-l-full"
                        )}
                      />
                      <Slider.Thumb
                        className="SliderThumb focus:outline-none -mt-1"
                        aria-label="Progress"
                      />
                    </Slider.Track>
                  </Slider.Root>

                  <div
                    className={cn(
                      "transition-all duration-500 mx-auto mt-3 flex-row justify-between font-normal",
                      isFull === "true" ? "flex" : "hidden z-0"
                    )}
                  >
                    <div className="text-xs md:text-sm sm:text-sm opacity-75">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-xs md:text-sm sm:text-sm opacity-75">
                      -{formatTime(remainingTime)}
                    </div>
                  </div>

                  <div className="transition-all duration-500 flex flex-row justify-between ">
                    <div
                      className={cn(
                        "transition-all duration-500 flex flex-row ",
                        isFull === "true" ? "w-8" : "w-0"
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
                            "bg-neutral-200/50 dark:bg-neutral-600/50 rounded-md",
                          isFull === "true" ? "my-8 " : "hidden"
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
                      <div className="mx-auto flex flex-row justify-between transition-all duration-500">
                        <button
                          onClick={() =>
                            setCurrentSongIndex(
                              (currentSongIndex - 1 + songIds.length) %
                                songIds.length
                            )
                          }
                        >
                          <Previous isFull={isFull} />
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
                            <Pause isFull={isFull} />
                          ) : (
                            <Play isFull={isFull} />
                          )}
                        </motion.button>
                        <button
                          onClick={() =>
                            setCurrentSongIndex(
                              (currentSongIndex + 1) % songIds.length
                            )
                          }
                        >
                          <Next isFull={isFull} />
                        </button>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "transition-all duration-500 flex flex-row ",
                        isFull === "true" ? "w-8" : "w-0"
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
                            "bg-neutral-200/50 dark:bg-neutral-600/50 rounded-md",
                          isFull === "true" ? "my-8 " : "hidden"
                        )}
                      >
                        <Shuffle playMode={playMode} />
                      </button>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "transition-all duration-500 flex-row mx-auto space-x-3",
                      isFull === "true" ? "flex" : "hidden"
                    )}
                  >
                    <button onClick={() => setVolume(0)}>
                      <Icon
                        icon="ion:volume-off"
                        className="font-bold w-5 md:w-5 sm:w-6 h-6 mt-4 md:mt-[1.375rem] sm:mt-[1.375rem]"
                      />
                    </button>

                    <Slider.Root
                      className="SliderRoot transition-all duration-500"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[volume]}
                      onValueChange={(newValue) => handleVolumeChange(newValue)}
                    >
                      <Slider.Track className="SliderTrack mt-9 md:mt-12 sm:mt-12 backdrop-blur-lg bg-opacity-75 cursor-pointer">
                        <Slider.Range
                          className={cn(
                            "SliderRange cursor-pointer",
                            volume === 1 ? "rounded-full" : "rounded-l-full"
                          )}
                        />
                        <Slider.Thumb
                          className="SliderThumb focus:outline-none -mt-1"
                          aria-label="Volume"
                        />
                      </Slider.Track>
                    </Slider.Root>

                    <button onClick={() => setVolume(1)}>
                      <Icon
                        icon="fa-solid:volume-up"
                        className="font-bold w-5 md:w-5 sm:w-6 h-6 mt-4 md:mt-[1.375rem] sm:mt-[1.375rem]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            <motion.div
              className={cn(
                "py-12 overflow-y-auto select-none transition-all duration-500",
                !display
                  ? "hidden"
                  : "z-[99999] block h-[50vh] md:h-screen sm:h-screen px-4 left-0 right-0 w-full md:w-1/2 sm:w-1/2",
                isFull === "true"
                  ? "block z-[99999]"
                  : "hidden z-0 pointer-events-none"
              )}
            >
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
                  const isPreviousRowHighlighted =
                    index === highlightedIndex - 1;
                  const isNextRowHighlighted = index === highlightedIndex + 1;
                  const isTwoRowsBeforeHighlighted =
                    index === highlightedIndex - 2;
                  const isTwoRowsAfterHighlighted =
                    index === highlightedIndex + 2;
                  const isThreeRowsBeforeHighlighted =
                    index === highlightedIndex - 3;
                  const isThreeRowsAfterHighlighted =
                    index === highlightedIndex + 3;
                  const isFourRowsBeforeHighlighted =
                    index === highlightedIndex - 4;
                  const isFourRowsAfterHighlighted =
                    index === highlightedIndex + 4;
                  return (
                    <motion.p
                      key={index}
                      className={cn(
                        "text-[1.75rem] md:text-[2.1rem] sm:text-[2.8rem] font-medium flex flex-col space-y-1 tracking-tighter transition-all duration-500 cursor-pointer px-2.5 md:px-0 sm:px-0 py-4 md:py-7 sm:py-10 leading-normal",
                        isHighlightedRow &&
                          highlightedIndex !== -1 &&
                          "text-3xl md:text-4xl sm:text-5xl blur-0",
                        isPreviousRowHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-40 blur-[0.5px]",
                        isNextRowHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-40 blur-[0.5px]",
                        isTwoRowsBeforeHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[1px]",
                        isTwoRowsAfterHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[1px]",
                        isThreeRowsBeforeHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[1.5px]",
                        isThreeRowsAfterHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[1.5px]",
                        isFourRowsBeforeHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[2px]",
                        isFourRowsAfterHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[2px]",
                        !isHighlightedRow &&
                          !isPreviousRowHighlighted &&
                          !isNextRowHighlighted &&
                          !isTwoRowsBeforeHighlighted &&
                          !isTwoRowsAfterHighlighted &&
                          !isThreeRowsBeforeHighlighted &&
                          !isThreeRowsAfterHighlighted &&
                          !isFourRowsBeforeHighlighted &&
                          !isFourRowsAfterHighlighted &&
                          highlightedIndex !== -1 &&
                          "opacity-25 blur-[2.5px]",
                        highlightedIndex === -1 &&
                          line.text !== "" &&
                          "opacity-25 blur-[2.5px]"
                      )}
                      onClick={() => audioRef.current.seekTo(line.timestamp)}
                      data-text={String(line.timestamp)}
                    >
                      <span className="mb-1 md:mb-2 sm:mb-2 leading-normal break-words hyphens-auto">
                        {line.text ? (
                          <>{line.text}</>
                        ) : (
                          <>
                            <div
                              className={cn(
                                "dots",
                                highlightedIndex === -1
                                  ? "flex blur-0"
                                  : "invisible"
                              )}
                            >
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </>
                        )}
                      </span>
                      {translationLine?.text && (
                        <span className="text-[1.325rem] md:text-[1.675rem] sm:text-[2.1rem] text-neutral-700 dark:text-neutral-300 font-medium leading-normal">
                          {translationLine.text}
                        </span>
                      )}
                    </motion.p>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
