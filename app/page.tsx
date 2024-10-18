import UrlShortenerContainer from "@/components/url-shortener-container";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl py-12 md:py-24 space-y-6 p-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">URL Shortener</h1>
      </div>
      <UrlShortenerContainer />
      <Toaster position="bottom-right" />
    </main>
  );
}
