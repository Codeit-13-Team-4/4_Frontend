import { DevupLogo } from "@/shared/icons";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="DevUp 홈으로 이동">
      <DevupLogo width={120} height={48} />
    </Link>
  );
}
