import Link from "next/link";

export default function enter() {
  return (
    <div>
      this is the MAIN page
      <p>THIS IS THE PARAGRAPGH</p>
      <Link href="/admin">
        <a>MOVE TO</a>
      </Link>
    </div>
  );
}
