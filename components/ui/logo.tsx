import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex mr-3" aria-label="AriesView">
      <Image 
        src="/ariesview-logo.svg" 
        alt="AriesView Logo" 
        width={150} 
        height={50} 
        className="relative top-1"
      />
    </Link>
  );
}
