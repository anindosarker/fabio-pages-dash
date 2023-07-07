import React from "react";
import grabber from "../lib/script";
import grabInfo from "@/lib/grabInfo";
import trackActivity from "@/lib/track";

export default function Grabber() {
  return (
    <div className="flex items-center justify-center mt-20">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={trackActivity}
      >
        Grab
      </button>
    </div>
  );
}
