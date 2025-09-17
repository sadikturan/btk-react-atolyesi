"use client";
import { useState } from "react";

export default function StarRating({ rating, setRating, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-2 mt-2 sm:mt-0">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star, id) => {
          const filled = star <= (hover || rating);

          return (
            <svg
              key={star}
              className={`w-4 h-4 ${
                filled ? "text-yellow-300" : "text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={!readOnly ? () => setRating(star) : undefined}
              onMouseEnter={!readOnly ? () => setHover(star) : undefined}
              onMouseLeave={!readOnly ? () => setHover(0) : undefined}
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
            </svg>
          );
        })}
      </div>
      <p className="text-sm font-medium text-gray-500">({rating.toFixed(1)})</p>
    </div>
  );
}
