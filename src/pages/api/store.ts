// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/lib/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from("access_log")
    .insert(req.body)
    .select();

  console.log("👉️ ~ file: store.ts:17 ~ data:\n", data);
  console.log("👉️ ~ file: store.ts:14 ~ error:\n", error);

  res.status(200).json(req.body);
}
