"use client"

import { paths } from "#/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ----------------------------------------------------------------------


export default function OverviewAppPage() {
  const router = useRouter()
  useEffect(() => {
    (
      router.push(paths.dashboard.customer.root)

    )
  })
  return (
    <></>
  )
}
