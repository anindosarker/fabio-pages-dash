import React, { useEffect } from "react";
import trackActivity from "@/lib/track";
import Link from "next/link";
import track3 from "@/lib/track3";

export default function Navbar() {
  // useEffect(() => {
  //   track3(); // Call the tracking function when the page mounts
  // }, []);

  return (
    <div className="flex bg-blue-100 rounded-sm text-black p-4 space-x-4 items-center justify-center">
      <Link href={"/"}>Home</Link>
      <Link href={"/test"}>Test</Link>
      <Link href={"/track"}>Track</Link>
      <Link href={"/grab"}>Grab</Link>
    </div>
  );
}
