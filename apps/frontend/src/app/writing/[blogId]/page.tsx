"use client";
import { Icons } from "@/components/icons";
import { API_URL } from "@/constants";
import { Blog } from "@/types/database";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { blogId: string } }) {
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`${API_URL}/blog/${params.blogId}`);
        const data = await response.json();
        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [params.blogId]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center w-full">
        <Icons.loading />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8 flex max-h-screen flex-col overflow-y-auto">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-zinc-400 my-4">
        {format(blog.createdAt, "MMMM dd, yyyy")}
      </p>
      <p className="my-10 leading-7 text-zinc-400">{blog.content}</p>
    </div>
  );
}
