"use client";
import { useState } from "react";

export default function Form({ onAdd }: { onAdd: (record: { note: string; amount: number }) => void }) {
  const [type, setType] = useState("支出");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  function handleAdd() {
    const signedAmount = type === "支出" ? -Number(amount) : Number(amount);
    const newRecord = { note: note, amount: signedAmount };
    onAdd(newRecord);
    setAmount("");
    setNote("");
  }

  return (
      <div className="flex flex-col gap-2 mb-6 sm:flex-row">     
      <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-3 py-2">
        <option value="收入">收入</option>
        <option value="支出">支出</option>
      </select>

      <input
        type="number"
        placeholder="金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded px-2 py-2 sm:w-40"
      />
      <input
        type="text"
        placeholder="備註"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border rounded px-2 py-2 flex-1"
      />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">新增</button>
    </div>
  );
}