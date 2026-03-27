import PostCard from "./PostCard";
import PostCount from "./PostCount";
import PostSkeleton from "./PostSkeleton";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
// task3 challenge3 - custom hook: usefetch
import useFetch from "../hooks/useFetch"; // import hook มาใช้

function PostList({ onToggleFavorite }) {
  // task3 challenge3 - custom hook: usefetch
  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  const [search, setSearch] = useState("");

  /* task3 challenge2 - pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  {
    /* task2 challenge2 - Sort posts */
  }
  const [sortOrder, setSortOrder] = useState("desc");
  const toggleSort = () => {
    setSortOrder((e) => (e === "desc" ? "asc" : "desc")); // desc: ใหม่ก่อน, asc: เก่าก่อน
  };

  // กรองโพสต์ตาม search และ sort โพสต์
  const filtered = posts
    .slice(0, 20) // copy ข้อมูลของ posts จำกัด 20 รายการ
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.id - a.id; // เรียงโพสต์ใหม่ก่อน
      } else {
        return a.id - b.id; // เรียงโพสต์เก่าก่อน
      }
    });

  /* task3 challenge2 - pagination */
  // คำนวณ Pagination จากข้อมูลที่กรองแล้ว
  const totalPages = Math.ceil(filtered.length / postsPerPage); // Math.ceil(): เป็นการ "ปัดเศษขึ้น"
  const indexOfLastPost = currentPage * postsPerPage; // ถ้าอยู่ หน้า 1: 1 * 10 = 10 (ตัวสุดท้ายคือ index ที่ 10)
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // ถ้าอยู่ หน้า 1: 10 - 10 = 0 (เริ่มดึงตั้งแต่ index ที่ 0)

  // ตัดเฉพาะข้อมูลที่จะแสดงในหน้านั้นๆ
  const currentItems = filtered.slice(indexOfFirstPost, indexOfLastPost); // ถ้าอยู่ หน้า 1: จะดึงข้อมูล Index ที่ 0-9

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
        <button onClick={refetch}>🔄 โหลดใหม่</button>
      </div>

      {/* task3 challenge2 - pagination */}
      {/* รายการโพสต์ (ใช้ข้อมูลที่ slice แล้ว) */}
      {currentItems.length === 0 ? (
        // task1 challenge3 - postskeleton component
        <PostSkeleton />
      ) : (
        // แสดงรายการโพสต์
        currentItems.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggleFavorite={() => onToggleFavorite(post.id)}
          />
        ))
      )}

      {/* Pagination Button ปุ่มเปลี่ยนหน้า */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ← ก่อนหน้า
        </button>

        <span>
          หน้า {currentPage} / {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

export default PostList;
