import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";

function PostList({ posts }) {
  return (
    <div>
      <h2
        style={{
          // color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      {/* task1 challenge1 - postcount component */}
      <PostCount count={posts.length} />

      {/* task1 challenge3 - postskeleton component */}
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))
      )}
    </div>
  );
}

export default PostList;
