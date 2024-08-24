"use client";
import { SidebarContent } from "@/components/sidebar-content";
import { API_URL } from "@/constants";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/blog`).then((res) => {
      res.json().then((data) => {
        setBlogs(data.data);
      });
    });
  }, []);
  return (
    <div className="flex flex-row min-h-screen w-full">
      <SidebarContent data={blogs} />
      {children}
    </div>
  );
}
