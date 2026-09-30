"use client";
import { useState } from "react";
import Form from "./Form";
import List from "./List";

export default function Accounting() {
  const [records, setRecords] = useState<{ note: string; amount: number }[]>([]);

  function handleSubmit(newRecord: { note: string; amount: number }) {
    setRecords([...records, newRecord]);
  }

  function handleDelete(index: number) {
    const updated = records.filter((r, i) => i !== index);
    setRecords(updated);
  }

  const total = records.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-2 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">記帳紀錄</h1>
      <Form onAdd={handleSubmit} />
      <List records={records} onDelete={handleDelete} total={total} />
    </div>
  );
}