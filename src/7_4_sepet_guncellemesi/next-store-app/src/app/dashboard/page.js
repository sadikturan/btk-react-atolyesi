"use client";

import { get_admin_categories } from "@/lib/api";

export default function Dashboard() {
  const sendRequest = async () => {
    return await get_admin_categories();
  };

  return (
    <div>
      <button
        onClick={sendRequest}
        className="text-white bg-blue-700 hover:bg-blue-800"
      >
        Send Request
      </button>
    </div>
  );
}
