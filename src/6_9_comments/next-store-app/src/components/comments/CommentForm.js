"use client";
import { useState } from "react";
import StarRating from "./StarRating";

export default function CommentForm() {
  const [rating, setRating] = useState(0);
  return (
    <form className="mb-2">
      <div className="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 mb-4">
        <label htmlFor="comment" className="sr-only">
          Rating
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className="py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
          placeholder="Write a comment..."
          required=""
          defaultValue={""}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
  );
}
