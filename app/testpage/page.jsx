"use client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Page() {
  const [name, setName] = useState();
  useEffect(() => {
    fetch("/api/testroute", {cache: 'no-store'})
      .then((res) => res.json())
      .then((data) => setName(data.message));
  }, []);
  console.log(name)
  return <p>{name}</p>;
}
