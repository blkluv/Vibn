import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";
import Input from "@/components/ui/contents/Input";
import InvertButton from "@/components/ui/buttons/InvertButton";

import site from "@/lib/site.config";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function QrLogin() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState("phone"); // 登录方式，默认为手机号登录
  const [phone, setPhone] = useState(""); // 手机号
  const [password, setPassword] = useState(""); // 密码
  const [verificationCode, setVerificationCode] = useState(""); // 验证码
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function checkStatus(key) {
    const res = await axios({
      url: `${site.api}/login/qr/check?key=${key}&timestamp=${Date.now()}&noCookie=true`,
    });
    return res.data;
  }

  async function getLoginStatus(cookie = "") {
    const res = await axios({
      url: `${site.api}/login/status?timestamp=${Date.now()}`,
      method: "post",
      data: {
        cookie,
      },
    });
    document.querySelector("#info").innerText = JSON.stringify(
      res.data,
      null,
      2
    );
    return res.data; // 返回获取的用户数据
  }

  async function login() {
    let timer;
    let timestamp = Date.now();
    const cookie = localStorage.getItem("cookie");
    await getLoginStatus(cookie);
    const res = await axios({
      url: `${site.api}/login/qr/key?timestamp=${Date.now()}`,
    });
    const key = res.data.data.unikey;
    const res2 = await axios({
      url: `${site.api}/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    });
    document.querySelector("#qrImg").src = res2.data.data.qrimg;

    timer = setInterval(async () => {
      const statusRes = await checkStatus(key);
      if (statusRes.code === 800) {
        clearInterval(timer);
      }
      if (statusRes.code === 803) {
        clearInterval(timer);
        alert("授权登录成功");
        const userData = await getLoginStatus(statusRes.cookie);
        localStorage.setItem("cookie", statusRes.cookie);
        localStorage.setItem("userData", JSON.stringify(userData));
        router.push("/dashboard");
      }
    }, 3000);
  }

  async function loginWithPhone() {
    // 使用手机号登录
    const res = await axios({
      url: `${site.api}/login/cellphone?phone=${encodeURIComponent(
        phone
      )}&password=${encodeURIComponent(password)}`,
    });
    console.log(res.data);
    // 处理登录结果
    return res; // 返回获取的用户数据
  }

  async function loginWithVerificationCode() {
    // 使用验证码登录
    const res = await axios({
      url: `${site.api}/login/cellphone?phone=${encodeURIComponent(
        phone
      )}&captcha=${encodeURIComponent(verificationCode)}`,
    });
    // 处理登录结果

    return res; // 返回获取的用户数据
  }

  async function sendVerificationCode() {
    try {
      const res = await axios({
        url: `${site.api}/captcha/sent`,
        method: "POST",
        data: {
          phone: phone,
        },
      });

      if (res.data.code === 200) {
        console.log("验证码发送成功");
      } else {
        console.error(res.data.msg || "验证码发送失败，请重试");
      }
    } catch (error) {
      console.error(error.message || "验证码发送失败，请重试");
    }
    setCountdown(60);
  }

  useEffect(() => {
    login();
  }, []);

  async function handleLogin() {
    if (loginMethod === "phone") {
      // 手机号登录
      const userData = await loginWithPhone();
      localStorage.setItem("cookie", userData.data.cookie);
      localStorage.setItem("userData", JSON.stringify(userData));
      router.push("/dashboard");
    } else {
      // 验证码登录
      const userData = await loginWithVerificationCode();
      localStorage.setItem("cookie", userData.data.cookie);
      localStorage.setItem("userData", JSON.stringify(userData));
      router.push("/dashboard");
    }
  }

  return (
    <Container title="登录">
      {loginMethod === "qr" && (
        <>
          <h1 className="font-semibold text-3xl md:text-4xl sm:text-5xl text-center">
            扫描二维码登录
          </h1>
          <img
            id="qrImg"
            className="rounded-xl border-2 border-red-600 mx-auto w-3/4 md:w-1/3 sm:w-1/3 mt-12"
          />

          <p className="text-center opacity-75 mt-6">
            请打开网易云音乐APP扫码登录
          </p>

          <p
            onClick={() => setLoginMethod("phone")}
            className="mx-auto max-w-xs mt-12 bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200 rounded-xl px-6 py-2 text-center cursor-pointer"
          >
            手机号登录
          </p>
        </>
      )}

      {loginMethod !== "qr" && (
        <img
          id="qrImg"
          className="hidden h-0 rounded-xl border-2 border-red-600 mx-auto w-2/3 md:w-1/3 sm:w-1/3 mt-12"
        />
      )}

      {/* 手机号登录表单 */}
      {loginMethod === "phone" && (
        <>
          <Huge>手机号登录</Huge>
          <div className="max-w-sm mt-4">
            <Input
              type="text"
              placeholder="手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {/* 验证码登录表单 */}
      {loginMethod === "captcha" && (
        <>
          <Huge>
            验证码登录
          </Huge>
          <div className="mt-4 max-w-sm">
            <Input
              type="text"
              placeholder="手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex flex-row relative">
              <Input
                type="text"
                placeholder="验证码"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                onClick={sendVerificationCode}
                disabled={countdown > 0}
                className={cn(
                  "absolute right-2 bottom-3 rounded-lg px-4 py-1",
                  countdown > 0
                    ? "opacity-75 bg-neutral-200 dark:bg-neutral-800"
                    : "bg-neutral-300 dark:bg-neutral-700"
                )}
              >
                {countdown > 0 ? `${countdown} 秒后重发` : "发送验证码"}
              </button>
            </div>
          </div>
        </>
      )}
      <div className="max-w-sm">
        {/* 登录按钮 */}
        {loginMethod !== "qr" && (
          <InvertButton onClick={handleLogin}>登录</InvertButton>
        )}

        {loginMethod === "phone" && (
          <InvertButton onClick={() => setLoginMethod("captcha")}>
            验证码登录
          </InvertButton>
        )}

        {loginMethod === "captcha" && (
          <InvertButton onClick={() => setLoginMethod("phone")}>
            密码登录
          </InvertButton>
        )}
      </div>

      <div className="hidden max-w-lg mx-auto bg-neutral-200 dark:bg-neutral-800 mt-6 overflow-x-auto">
        <p className="opacity-75 font-mono text-center mb-4">console.log ↓</p>
        <div id="info" className="info font-mono "></div>
      </div>
    </Container>
  );
}
