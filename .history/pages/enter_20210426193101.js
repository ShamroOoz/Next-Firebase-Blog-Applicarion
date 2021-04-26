import Link from "next/link";

export default function enter() {
  return (
    <div>
      this is the MAIN page
      <P>THIS IS THE PARAGRAPGH</P>
      <Link href="/admin">
        <a>MOVE TO</a>
      </Link>
    </div>
  );
}
