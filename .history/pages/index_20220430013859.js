import PostFeed from "@/components/PostFeed";
import Loader from "@/components/Loader";
import Metatags from "@/components/Metatags";
import { firestore, fromMillis, postToJSON } from "@/lib/firebase";
import {
  collectionGroup,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

import { useState } from "react";

export default function Home({ data }) {
  //
  const [posts, setPosts] = useState(data);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  console.log(data);
  const getMorePosts = async () => {
    const last = posts[posts.length - 1];

    // const cursor =
    //   typeof last.createdAt === "number"
    //     ? fromMillis(last.createdAt)
    //     : last.createdAt;

    const query = collectionGroup(
      firestore,
      "posts",
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(last.createdAt),
      limit(process.env.NEXT_PUBLIC_LIMIT)
    );

    const newPosts = (await getDocs(query)).docs.map((doc) => doc.data());
    if (newPosts.length == 0) {
      setPostsEnd(true);
    }
    setPosts(posts.concat(newPosts));
    setLoading(false);
  };

  return (
    <main>
      <Metatags />
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}

export async function getServerSideProps() {
  const postsQuery = collectionGroup(
    firestore,
    "posts",
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(process.env.NEXT_PUBLIC_LIMIT)
  );

  const data = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { data }, // will be passed to the page component as props
  };
}
