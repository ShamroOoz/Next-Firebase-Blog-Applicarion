import PostFeed from "@/components/PostFeed";
import Loader from "@/components/Loader";
import { firestore, fromMillis, postToJSON } from "@/lib/firebase";

import { useState } from "react";

// Max post to query per page
const LIMIT = 1;

export default function Home({posts}) {

  const [posts, setPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  

  return (
    <main>
        <PostFeed posts={posts} />

        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'You have reached the end!'}
      </main>
  );
}

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
