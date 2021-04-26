import Link from "next/link";

export default function enter() {
  return (
    <div>
      this is the MAIN page
      <p>THIS IS THE PARAdGRAPGH</p>
      <Link
        prefetch={true}
        href={{
          pathname: "/[username]/[slug]",
          query: { username: "shamroz", slug: "123344" },
        }}
      >
        <a>MOVE TO</a>
      </Link>
    </div>
  );
}
