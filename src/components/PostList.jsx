import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function PostList({ post, favorites, onToggleFavorite }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // task3 challenge1 - refresh button
  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();
      setPosts(data.slice(0, 20)); // เอาแค่ 20 รายการแรก
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []); // [] = ทำครั้งเดียวตอน component mount

  {
    /* task2 challenge2 - Sort posts */
  }
  const [sortOrder, setSortOrder] = useState("desc");
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

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

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
      <PostCount count={filtered.length} />

      {/* task2 challenge2 - Sort posts */}
      <div
        style={{
          display: "flex",
          margin: "1rem",
          justifyContent: "space-between",
        }}
      >
        <button onClick={toggleSort}>
          {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
        </button>

        {/* task3 challenge1 - refresh button */}
        <button onClick={fetchPosts}>🔄 โหลดใหม่</button>
      </div>

      {/* task1 challenge3 - postskeleton component */}
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        // แสดงรายการโพสต์
        filtered.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isFavorite={favorites.includes(post.id)}
            onToggleFavorite={() => onToggleFavorite(post.id)}
          />
        ))
      )}
    </div>
  );
}

export default PostList;
