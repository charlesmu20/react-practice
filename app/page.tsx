"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      router.push("/accounting");
    } catch (err: any) {
      setLoginError("登入失敗，請確認帳號密碼是否正確");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      router.push("/accounting");
    } catch (err: any) {
      setRegisterError("註冊失敗，可能是信箱已被使用或密碼太短");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (checkingAuth) {
    return null;
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>您已經使用 {user.email} 登入</p>
        <div className="flex gap-2">
          <Link href="/accounting">
            <button className="border px-4 py-1 rounded cursor-pointer">立刻開始</button>
          </Link>
          <button onClick={handleLogout} className="border px-4 py-1 rounded cursor-pointer">
            登出
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-8">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold">登入系統</h2>
        <input
          type="email"
          placeholder="電郵"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="password"
          placeholder="密碼"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button onClick={handleLogin} className="border px-4 py-1 rounded cursor-pointer">
          登入
        </button>
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold">註冊帳戶</h2>
        <input
          type="email"
          placeholder="電郵"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="password"
          placeholder="密碼"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button onClick={handleRegister} className="border px-4 py-1 rounded cursor-pointer">
          註冊
        </button>
        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
      </div>
    </div>
  );
}