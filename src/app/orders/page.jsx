"use client";
import React from "react";
import Orders from "../client/components/Orders";
import { useSearchParams } from "next/navigation";

export default function OrdersPage() {
    const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const cover = searchParams.get("cover");
  const category = searchParams.get("category");
  const gigId = searchParams.get("gigId");
  return (
    <Orders title={title} price={price} cover={cover} category={category} gigId={gigId} />
  )
}