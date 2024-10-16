import UrlShortenerContainer from "@/components/url-shortener-container";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="bg-[url('../public/background.svg')] min-h-screen">
      <div className="mx-auto max-w-6xl py-12 md:py-24 space-y-6 p-12 ">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl md:text-4xl font-bold py-4 bg-gradient-to-r from-blue-700 to-pink-500 inline-block text-transparent bg-clip-text">Shorten Your Long Links</h1>
          <h1 className="text-neutral-400">This is an efficient and easy-to-use URL shortening service that streamlines your online experiences.</h1>
        </div>
        <UrlShortenerContainer />
        <Toaster position="bottom-right" />
      </div>
    </main>
  );
}
