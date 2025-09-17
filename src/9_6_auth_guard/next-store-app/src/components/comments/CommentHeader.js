export default function CommentHeader({ commentCount }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
        Comments ({commentCount})
      </h2>
    </div>
  );
}
