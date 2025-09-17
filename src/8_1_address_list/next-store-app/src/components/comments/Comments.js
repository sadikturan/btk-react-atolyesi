"use client";

import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import CommentHeader from "./CommentHeader";
import Link from "next/link";
import CommentList from "./CommentList";

export default function Comments({ comments, product_id }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <section className="bg-white mt-10">
      <div>
        <CommentHeader commentCount={comments.length} />
        {isAuthenticated ? (
          <CommentForm product_id={product_id} />
        ) : (
          <div className="text-gray-700 mb-4">
            <span>Yorum yapmak için giriş yapınız.</span>
            <Link
              href="/account/login"
              className="text-blue-500 hover-underline"
            >
              Giriş Yap
            </Link>
          </div>
        )}
        <CommentList comments={comments} />
      </div>
    </section>
  );
}
