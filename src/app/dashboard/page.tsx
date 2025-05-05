"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-20">Checking auth...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <p className="mt-4">Only logged-in users can access this page.</p>
    </div>
  );
}