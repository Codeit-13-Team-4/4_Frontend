import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={"/header/devup-logo.svg"}
        alt="Logo"
        width={120}
        height={48}
      />
    </Link>
  );
}
