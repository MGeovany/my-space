"use client";
import { SidebarContent } from "@/components/sidebar-content";
import { API_URL } from "@/constants";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/bookmark`).then((res) => {
      res.json().then((data) => {
        setBookmarks(data.data);
      });
    });
  }, []);
  return (
    <div className="flex flex-row min-h-screen w-full">
      <SidebarContent
        title="💎 Bookmarks"
        data={bookmarks}
        redirect="bookmarks"
      />
      {children}
    </div>
  );
}
