import { format } from "date-fns";
import Link from "next/link";
import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icons } from "../icons";

interface SidebarContentProps {
  title: string;
  url?: string;
  date?: Date;
  data: any[];
  redirect: string;
}

export const SidebarContent: FC<SidebarContentProps> = ({
  title,
  data,
  redirect,
}) => {
  const pathname = usePathname();
  const [imageStatus, setImageStatus] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const handleImageError = (index: number) => {
    const updatedStatus = [...imageStatus];
    updatedStatus[index] = true;
    setImageStatus(updatedStatus);
  };

  return (
    <div className="border-2 border-l-0 h-full max-h-screen min-h-screen w-[300px] min-w-[300px] p-4 border-zinc-800 bg-zinc-900 overflow-auto">
      <h1 className="font-bold text-sm py-2">{title}</h1>
      <ul className="space-y-2 my-6">
        {data.map((content, index) => {
          const isActive = pathname === `/${redirect}/${content.id}`;

          return (
            <li
              key={content.id}
              className={`mt-8 p-2 rounded-md cursor-pointer text-sm ${
                isActive ? "bg-zinc-700" : "hover:bg-zinc-800"
              }`}
            >
              <Link href={`/${redirect}/${content.id}`}>
                <h2>{content.title}</h2>
                <div className="flex items-center gap-2">
                  {redirect === "bookmarks" && (
                    <>
                      {imageStatus[index] ? (
                        <Icons.url />
                      ) : (
                        <Image
                          src={`https://www.google.com/s2/favicons?domain=${content.url}`}
                          alt="favicon"
                          width={16}
                          height={16}
                          onError={() => handleImageError(index)}
                        />
                      )}
                      <span className="text-sm text-gray-500">
                        {new URL(content.url).hostname}
                      </span>
                    </>
                  )}
                  {redirect === "writing" || redirect === "project-ideas" ? (
                    <p className="text-sm text-gray-500">
                      {format(content.createdAt, "MMMM dd, yyyy")}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
