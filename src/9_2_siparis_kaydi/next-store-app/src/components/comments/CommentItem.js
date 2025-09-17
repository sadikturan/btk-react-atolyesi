import StarRating from "./StarRating";

export default function CommentItem({ comment, newMessage = false }) {
  return (
    <article className="bg-white rounded p-5 shadow mb-8 border border-gray-50">
      <header className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full object-cover border"
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt={comment.user}
          />
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              {comment.user}
            </h4>
          </div>

          <time dateTime={comment.created} className="text-xs text-gray-500">
            {new Date(comment.created).toLocaleDateString("tr-TR", {
              dateStyle: "long",
            })}
          </time>
        </div>
        <StarRating rating={comment.rating} readOnly />
      </header>
      <p className="text-gray-700 text-sm leading-relaxed">
        {comment.description}
      </p>

      {newMessage && (
        <p className="mt-2 text-green-600 text-sm">Mesajınız kayıt edildi.</p>
      )}
    </article>
  );
}
