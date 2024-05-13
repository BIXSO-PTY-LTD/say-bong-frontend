"use client"

import { paths } from "#/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ----------------------------------------------------------------------


export default function NewsPage() {
  const router = useRouter()
  useEffect(() => {
    (
      router.push(paths.dashboard.news.special.root)
    )
  })
  return (
    <></>
  )
}
