"use client";
import { Icons } from "@/components/icons";
import { API_URL } from "@/constants";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const [bookmark, setBookmarks] = useState<Bookmark>();
  const [isImageBroken, setIsImageBroken] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/bookmark/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setBookmarks(data.data);
        }
      } catch (error) {
        console.error("Error fetching bookmark:", error);
      }
    }

    fetchData();
  }, [params.id]);

  if (!bookmark) {
    return (
      <div className="flex items-center justify-center w-full">
        <Icons.loading />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8 flex max-h-screen flex-col overflow-y-auto space-y-3">
      <span className="flex-none justify-center flex items-center space-x-2 cursor-pointer self-start border uppercase rounded-full hover:bg-opacity-30 px-3 py-0.5 text-xs font-semibold leading-5 tracking-wide  border-opacity-10 border-gray-200 text-gray-300 bg-gray-200 bg-opacity-10">
        {bookmark.tag}
      </span>
      <h1 className="text-2xl font-bold">{bookmark.title}</h1>
      <div className="my-2 text-zinc-400 flex flex-row items-center gap-2">
        {isImageBroken ? (
          <Icons.url />
        ) : (
          <Image
            src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
            alt="favicon"
            width={16}
            height={16}
            onError={() => setIsImageBroken(true)}
          />
        )}
        {new URL(bookmark.url).hostname}
      </div>
      <p className="text-zinc-400 italic">{bookmark.url}</p>
      <div className="mt-6">
        <a
          href={bookmark.url}
          className="flex space-x-2 flex-none items-center justify-center cursor-pointer leading-none transition-all font-semibold px-4 py-3 text-sm opacity-100 rounded-lg text-white hover:text-white shadow-xs bg-blue-500 border  border-blue-400 border-opacity-50 hover:shadow-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.url />
          <span>Visit</span>
        </a>
      </div>
    </div>
  );
}
