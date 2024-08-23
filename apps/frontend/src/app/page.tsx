import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 pb-10 md:px-8 text-zinc-400 leading-8 mt-4">
      <p className="text-zinc-400 leading-8 mt-12 mb-4">
        Hi, I’m Marlon Geovany Castro Mejia. I’m a{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mgeovany"
          className="text-blue-600 hover:underline"
        >
          software engineer
        </a>{" "}
        who loves diving into the intricacies of how websites function.
      </p>
      <p className="my-4">
        Currently, I’m focused on developing applications and writing{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/@mgeovany"
          className="text-blue-600 hover:underline"
        >
          technical blogs
        </a>{" "}
        to share my knowledge and experiences in the field.
      </p>
      <p>
        In my career, I’ve worked on various projects that allow me to explore
        and enhance web technologies. I also enjoy documenting my journey and
        insights through{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dev.to/mgeovany"
          className="text-orange-600 hover:underline"
        >
          blogging,
        </a>{" "}
        aiming to help others in their software development path.
      </p>
      <Image
        src="/me.webp"
        alt="Marlon Geovany Castro Mejia"
        width={300}
        height={300}
        className="rounded-lg my-4"
      />
    </main>
  );
}
