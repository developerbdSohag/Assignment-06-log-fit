import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-6xl font-extrabold text-[#ccff00] mb-4">404</h2>
      <p className="text-lg font-bold uppercase mb-2">Page Not Found</p>
      <p className="text-gray-400 text-xs mb-6">The page you are looking for doesn&apos;t exist.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-bold text-xs px-5 py-2.5 rounded-md hover:bg-[#b3e600] transition">Return Home</Link>
    </div>
  );
}