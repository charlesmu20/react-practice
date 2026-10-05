type Record = { id: string; note: string; amount: number };

export default function List({
  records,
  onDelete,
  total,
}: {
  records: Record[];
  onDelete: (id: string) => void;
  total: number;
}) {
  return (
    <div>
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.id} className="flex justify-between items-center">
            <span className={`w-16 ${r.amount < 0 ? "text-red-500" : "text-green-600"}`}>
              {r.amount}
            </span>
            <span className="flex-1 min-w-0 break-words">{r.note}</span>
            <button onClick={() => onDelete(r.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">刪除</button>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-bold text-right">小計：{total}</p>
    </div>
  );
}