"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const covers = [
  "/img/cover.jpg",
  "/img/cover2.jpg",
  "/img/cover3.jpg",
  "/img/cover4.jpg",
];

export default function Banner() {
  const [coverIndex, setCoverIndex] = useState(0);
  const router = useRouter();

  const handleImageClick = () => {
    setCoverIndex((prev) => (prev + 1) % covers.length);
  };

  return (
    <div className="relative w-full h-[50vh]">
      <Image
        src={covers[coverIndex]}
        alt="Banner"
        fill
        className="object-cover cursor-pointer"
        onClick={handleImageClick}
      />
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={() => router.push("/venue")}
          className="bg-white text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          Select Venue
        </button>
      </div>
    </div>
  );
}
