import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-700">Henüz yorum yapılmamış.</p>
      ) : (
        <div className="comments">
          {comments.map((comment, key) => (
            <CommentItem comment={comment} key={key} />
          ))}
        </div>
      )}
    </>
  );
}
