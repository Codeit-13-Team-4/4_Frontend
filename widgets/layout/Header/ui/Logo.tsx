import { DevupLogo } from "@/shared/icons";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <DevupLogo width={120} height={48} />
    </Link>
  );
}
