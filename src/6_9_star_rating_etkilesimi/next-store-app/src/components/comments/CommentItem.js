import StarRating from "./StarRating";

export default function CommentItem({ comment }) {
  return (
    <article className="text-base bg-white rounded-lg mb-10">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt={comment.user}
            />
            {comment.user}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={comment.created} title="February 8th, 2022">
              {new Date(comment.created).toLocaleDateString("tr-TR", {
                dateStyle: "long",
              })}
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{comment.description}</p>
      <p>
        <StarRating rating={comment.rating} readOnly />
      </p>
    </article>
  );
}
