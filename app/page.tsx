import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import { CircleHelp } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";
import UrlShortenerContainer from "@/components/url-shortener-container";

export default function Home() {
  return (
    <ClerkProvider>
      <main className="bg-[url('../public/background.svg')] min-h-screen">
        <div className="mx-auto max-w-6xl py-12 md:py-24 space-y-6 p-12 ">
          <Header />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-4xl font-bold py-4 bg-gradient-to-r from-blue-700 to-pink-500 inline-block text-transparent bg-clip-text">Shorten Your Long Link</h1>
            <h1 className="text-neutral-400">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experiences.</h1>
            <h1 className="text-neutral-400">You can create <span className="text-red-500 font-bold">05</span> more links. Register  Now to enjoy Unlimited usage <span><CircleHelp className="w-4 h-4 text-neutral-400 ml-1 inline-flex" /></span></h1>
          </div>
          <UrlShortenerContainer />
          <Toaster position="bottom-right" />
        </div>
      </main>
    </ClerkProvider>
  );
}