import Link from "next/link";
import React, { FC } from "react";
import { Icons } from "./icons";

export const SideBar: FC = () => {
  return (
    <div className="border-2 h-full max-h-screen min-h-screen w-[250px] p-4 border-zinc-800 bg-zinc-900">
      <h1 className="font-bold text-sm py-2">mgeovany&apos;s space</h1>
      <ul className="space-y-2 my-6">
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <Link href={"/"} className="w-full flex flex-row p-2 items-center">
            <Icons.home className="h-5" />
            <span className="ml-2">Home</span>
          </Link>
        </li>
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <Link
            href={"/writing"}
            className="w-full flex flex-row p-2 items-center"
          >
            <Icons.writing />
            <span className="ml-2">Writing</span>
          </Link>
        </li>
        <h4 className="text-xs p-2 my-4">Me</h4>
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <Link
            href={"/bookmarks"}
            className="w-full flex flex-row p-2 items-center"
          >
            <Icons.bookmark />
            <span className="ml-2">Bookmarks</span>
          </Link>
        </li>
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <Link
            href={"/project-ideas"}
            className="w-full flex flex-row p-2 items-center"
          >
            <Icons.project />
            <span className="ml-2">Project Ideas</span>
          </Link>
        </li>
        <h4 className="text-xs p-2 my-4">Socials</h4>
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <a
            href={"https://github.com/MGeovany"}
            className="w-full flex flex-row p-2 items-center"
          >
            <Icons.github className="h-4" />
            <span className="ml-2">Github</span>
          </a>
        </li>
        <li className="text-sm hover:bg-zinc-800 cursor-pointer rounded-md">
          <a
            href={"https://www.linkedin.com/in/m-geovany/"}
            className="w-full flex flex-row p-2 items-center"
          >
            <Icons.linkedIn className="w-4" />
            <span className="ml-2">LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
