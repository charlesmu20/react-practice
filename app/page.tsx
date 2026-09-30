import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">我的記帳工具</h1>
      <p className="text-gray-500">歡迎光臨我的頁面</p>
      <Link href="/accounting">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          點此開始
        </button>
      </Link>
    </div>
  );
}