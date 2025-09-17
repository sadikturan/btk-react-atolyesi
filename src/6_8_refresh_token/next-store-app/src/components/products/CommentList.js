import StarRating from "./StarRating";

export default function CommentList({ comments }) {
  return (
    <section className="bg-white mt-10">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>
        </div>

        <form className="mb-2">
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

        {comments.length === 0 ? (
          <p className="text-gray-700">Henüz yorum yapılmamış.</p>
        ) : (
          <div className="comments p-2">
            {comments.map((comment) => (
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
                      <time
                        dateTime={comment.created}
                        title="February 8th, 2022"
                      >
                        {new Date(comment.created).toLocaleDateString("tr-TR", {
                          dateStyle: "long",
                        })}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.description}
                </p>
                <p>
                  <StarRating rating={comment.rating} />
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
