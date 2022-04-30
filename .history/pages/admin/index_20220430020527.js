import AuthCheck from "@/components/AuthCheck";
import PostFeed from "@/components/PostFeed";
import Metatags from "@/components/Metatags";
import CreateNewPost from "@/components/CreateNewPost";
import { firestore, auth } from "@/lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <Metatags title="Admin panel" />
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = collection(firestore, `users/${auth.currentUser.uid}/posts`);
  const queryref = query(ref, orderBy("createdAt"));
  const [querySnapshot] = useCollection(queryref);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
