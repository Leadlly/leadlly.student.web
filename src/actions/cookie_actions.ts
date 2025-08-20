"use server";

import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value ?? "";
};
