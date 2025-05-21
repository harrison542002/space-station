import Link from "next/link";
import React from "react";
import { Luckiest_Guy } from "next/font/google";
import PriceChartList from "@/components/priceChartList";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luckiest",
});

const Page = async ({ params }: { params: Promise<{ artifact: string }> }) => {
  const { artifact } = await params;

  return (
    <div className="py-4 px-2">
      <Link
        href={"/"}
        className="block w-fit text-black px-4  md:px-8 py-2 rounded-full shadow-lg md:text-lg bg-primary font-semibold"
      >
        <span>Back</span>
      </Link>
      <div className="py-4">
        <h1 className={`${luckiestGuy.className} text-2xl`}>
          {decodeURIComponent(artifact)}
        </h1>

        <PriceChartList artifact={artifact} />
      </div>
    </div>
  );
};

export default Page;
