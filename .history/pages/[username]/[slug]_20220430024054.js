import styles from "@/styles/Post.module.css";
import PostContent from "@/components/PostContent";
import Metatags from "@/components/Metatags";
import { firestore, getUserWithUsername, postToJSON } from "@/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "@/components/AuthCheck";
import HeartButton from "@/components/HeartButton";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";

///
export default function Post({ post, path }) {
  //
  const postRef = doc(firestore, path);
  const [realtimePost] = useDocumentData(postRef);
  const postdata = realtimePost || post;
  const { user: currentUser } = useAuth();

  return (
    <main className={styles.container}>
      <Metatags title={post.title} />
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <strong>{postdata.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  // const userDoc = await getUserWithUsername(username);
  const usersRef = collection("users");
  const queryref = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(queryref)).docs[0];

  console.log(userDoc);

  let post;
  let path;

  //  const colRef = collection(firestore, `users`);
  // const postRef = doc(colRef, `${auth.currentUser.uid}/posts/${slug}`);

  if (userDoc) {
    const postRef = doc(userDoc.ref, "posts", slug);
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs

  const colRef = collectionGroup(firestore, "posts");
  const snapshot = await getDocs(colRef);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
