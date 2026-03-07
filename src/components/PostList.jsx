import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import { useState } from "react";

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");

  {
    /* task2 challenge2 - Sort posts */
  }
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSort = () => {
    setSortOrder((e) => (e === "desc" ? "asc" : "desc")); // desc: ใหม่ก่อน, asc: เก่าก่อน
  };

  // กรองโพสต์ตาม search และ sort โพสต์
  const filtered = [...posts] // copy ข้อมูลของ posts
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.id - a.id; // เรียงโพสต์ใหม่ก่อน
      } else {
        return a.id - b.id; // เรียงโพสต์เก่าก่อน
      }
    });

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

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* task1 challenge1 - postcount component */}
      <PostCount count={posts.length} />

      {/* task2 challenge2 - Sort posts */}
      <button
        onClick={toggleSort}
        style={{
          display: "flex",
          marginBottom: "1rem",
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {/* task1 challenge3 - postskeleton component */}
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        // แสดงรายการโพสต์
        filtered.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            body={post.body}
            isFavorite={favorites.includes(post.id)}
            onToggleFavorite={() => onToggleFavorite(post.id)}
          />
        ))
      )}
    </div>
  );
}

export default PostList;
