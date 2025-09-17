"use client";

import { useState } from "react";

export default function ProductImageSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length == 0) {
    return <div>Görsel bulunamadı.</div>;
  }

  return (
    <div>
      <div>
        <img
          src={images[activeIndex].image}
          alt=""
          className="w-full h-auto border border-gray-300 rounded-lg block p-3"
        />
      </div>
      <div className="flex gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.image}
            alt={img.alt_text}
            className={`block p-1 rounded-sm w-16 h-16 object-cover cursor-pointer border ${
              activeIndex === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
