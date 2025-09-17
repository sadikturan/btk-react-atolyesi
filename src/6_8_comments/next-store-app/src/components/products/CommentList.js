import CommentItem from "../comments/CommentItem";

export default function CommentList({ comments }) {
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-700">Henüz yorum yapılmamış.</p>
      ) : (
        <div className="comments p-2">
          {comments.map((comment, key) => (
            <CommentItem comment={comment} key={key} />
          ))}
        </div>
      )}
    </>
  );
}
