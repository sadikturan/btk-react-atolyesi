"use client";
import { useState } from "react";
import StarRating from "./StarRating";
import { post_comment } from "@/lib/api";
import CommentItem from "./CommentItem";

export default function CommentForm({ product_id }) {
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [submittedComment, setSubmittedComment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Lütfen bir puan seçin!");
      return;
    }

    try {
      setError(null);

      const result = await post_comment({
        product_id: product_id,
        rating: rating,
        description: commentText,
      });

      setSubmittedComment(result);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.message);
      } else {
        setError("Yorum gönderilemedi. Lütfen tekrar deneyin.");
      }
    }
  };

  if (submittedComment) {
    return <CommentItem comment={submittedComment} newMessage />;
  }

  return (
    <form className="mb-2" onSubmit={handleSubmit}>
      {error && (
        <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}
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
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="my-2 bg-blue-700 py-2 px-4 font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-blue-800"
      >
        Post comment
      </button>
    </form>
  );
}
