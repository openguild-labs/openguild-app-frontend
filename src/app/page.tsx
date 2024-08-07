import { HEADER_HEIGHT } from "@/constants/dimensions";
import { MISSIONS_PATH } from "@/constants/links";
import Link from "next/link";

export default function Page() {
  return (
    <div
      className="flex justify-around items-center h-[calc(100vh-60px)]"
      style={{
        marginTop: -HEADER_HEIGHT,
      }}
    >
      <div>
        <h2 className="text-3xl font-semibold mb-5">Web3 Royalty Platform Proposal</h2>
        <Link href={MISSIONS_PATH} className="rounded-lg bg-primary-color text-white px-4 py-3">
          Launch App
        </Link>
      </div>
      <div className="w-[280px] h-[280px] border rounded-lg border-neutral-800"></div>
    </div>
  );
}
