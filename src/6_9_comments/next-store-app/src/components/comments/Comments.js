"use client";

import { useSelector } from "react-redux";
import CommentList from "../products/CommentList";
import CommentForm from "./CommentForm";
import CommentHeader from "./CommentHeader";
import Link from "next/link";

export default function Comments({ comments }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <section className="bg-white mt-10">
      <div>
        <CommentHeader commentCount={comments.length} />
        {isAuthenticated ? (
          <CommentForm />
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
