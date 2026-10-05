"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import Form from "./Form";
import List from "./List";
import Link from "next/link";

type Record = {
  id: string;
  note: string;
  amount: number;
  createdAt?: Timestamp;
};

export default function Accounting() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [records, setRecords] = useState<Record[]>([]);
  const router = useRouter();
  // 沒登入踢回首頁
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);
  // 確定登入後，監聽這個使用者的紀錄  
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "records"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        note: d.data().note,
        amount: d.data().amount,
        createdAt: d.data().createdAt,
      }));
      // 用 createdAt 做前端排序
      data.sort((a, b) => (a.createdAt?.toMillis() ?? 0) - (b.createdAt?.toMillis() ?? 0));
      setRecords(data);
    });

    return () => unsubscribe();
  }, [user]);

  async function handleSubmit(newRecord: { note: string; amount: number }) {
    if (!user) return;
    await addDoc(collection(db, "records"), {
      uid: user.uid,
      note: newRecord.note,
      amount: newRecord.amount,
      createdAt: serverTimestamp(),
    });
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, "records", id));
  }


  const total = records.reduce((sum, r) => sum + r.amount, 0);
  
  if (checkingAuth) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-2 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">記帳紀錄</h1>
      <Form onAdd={handleSubmit} />
      <List records={records} onDelete={handleDelete} total={total} />
      <div className="flex justify-center mt-8">
        <Link href="/">
          <button className="border px-4 py-1 rounded cursor-pointer">返回首頁</button>
        </Link>
      </div>
    </div>
  );
}