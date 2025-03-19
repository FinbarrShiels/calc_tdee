import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap justify-center items-center space-x-4 text-center">
          <Link href="/about" className="hover:underline whitespace-nowrap">About</Link>
          <span className="hidden sm:inline">|</span>
          <Link href="/contact" className="hover:underline whitespace-nowrap">Contact</Link>
          <span className="hidden sm:inline">|</span>
          <Link href="/privacy" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
          <span className="hidden sm:inline">|</span>
          <Link href="/terms" className="hover:underline whitespace-nowrap">Terms of Use</Link>
          <span className="hidden sm:inline">|</span>
          <Link href="/faq" className="hover:underline whitespace-nowrap">FAQ</Link>
        </div>
        <div className="text-center mt-4 text-sm opacity-75">
          &copy; {new Date().getFullYear()} TDEE Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 