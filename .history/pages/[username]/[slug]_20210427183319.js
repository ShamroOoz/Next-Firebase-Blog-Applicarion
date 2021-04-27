import styles from "@/styles/Post.module.css";
import PostContent from "@/components/PostContent";
import { firestore, getUserWithUsername, postToJSON } from "@/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "@/components/AuthCheck";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

///
export default function Post({ post, path }) {
  //
  const postRef = firestore.doc(path);
  const [realtimePost] = useDocumentData(postRef);
  const postdata = realtimePost || post;
  const { user: currentUser } = useAuth();

  return (
    <main className={styles.container}>
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
          {/* <HeartButton postRef={postRef} /> */}
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
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup("posts").get();

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
