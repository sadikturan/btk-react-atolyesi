export default function CategoryItem() {
  return (
    <div
      className="flex
             flex-col justify-center items-center gap-3 bg-white p-5 rounded-lg cursor-pointer border border-gray-200 hover:shadow hover:bg-gray-100"
    >
      <svg
        className="h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#666666"
      >
        <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
      </svg>
      <span className="text-base lg:text-lg font-semibold">Computers</span>
    </div>
  );
}
