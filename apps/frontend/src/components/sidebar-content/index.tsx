import { format } from "date-fns";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";

interface SidebarContentProps {
  data: Blog[];
}

export const SidebarContent: FC<SidebarContentProps> = ({ data }) => {
  const pathname = usePathname();

  return (
    <div className="border-2 border-l-0 h-full max-h-screen min-h-screen w-[300px] min-w-[300px] p-4 border-zinc-800 bg-zinc-900 overflow-auto">
      <h1 className="font-bold text-sm py-2">✍️ Recent writing</h1>
      <ul className="space-y-2 my-6">
        {data.map((content) => {
          const isActive = pathname === `/writing/${content.id}`;
          return (
            <li
              key={content.id}
              className={`mt-8 p-2 rounded-md cursor-pointer text-sm ${
                isActive ? "bg-zinc-700" : "hover:bg-zinc-800"
              }`}
            >
              <Link href={`/writing/${content.id}`}>
                <h2>{content.title}</h2>
                <p className="text-sm text-gray-500">
                  {format(content.createdAt, "MMMM dd, yyyy")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
