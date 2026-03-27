// task4 challenge2 - search page
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import PostCount from "../components/PostCount";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage({ onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // สร้าง Local State เพื่อเก็บค่าที่กำลังพิมพ์ (ยังไม่ส่งขึ้น URL)
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  // ดึงค่าจริงจาก URL มาใช้กรองข้อมูล (Source of Truth สำหรับการแสดงผล)
  const query = searchParams.get("q") || "";

  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  // ฟังก์ชันสำหรับ "ส่ง" คำค้นหาขึ้นไปบน URL
  const handleSearch = (e) => {
    if (e) e.preventDefault(); // ป้องกันหน้าเว็บ Refresh ถ้าใช้ <form>

    if (inputValue.trim()) {
      setSearchParams({ q: inputValue });
    } else {
      setSearchParams({}); // ถ้าว่างให้ล้าง Query
    }
  };

  // กรองข้อมูลโดยใช้ 'query' จาก URL (ซึ่งจะเปลี่ยนก็ต่อเมื่อกดปุ่มเท่านั้น)
  const filtered = posts
    .slice(0, 20)
    .filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));

  if (loading) return <LoadingSpinner />;
  if (error) return <div>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      <h2
        style={{ borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}
      >
        {query ? `ผลการค้นหาสำหรับ: ${query}` : "ค้นหาโพสต์"}
      </h2>

      {/* ใช้ Form เพื่อให้กด Enter แล้วค้นหาได้ด้วย */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input
          type="text"
          placeholder="พิมพ์คำค้นหา..."
          value={inputValue} // ผูกกับ Local State
          onChange={(e) => setInputValue(e.target.value)} // พิมพ์แล้วเปลี่ยนแค่ใน input
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
          }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          ค้นหา
        </button>
      </form>

      <PostCount count={filtered.length} />

      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>ไม่พบโพสต์</p>
      ) : (
        filtered.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggleFavorite={() => onToggleFavorite(post.id)}
          />
        ))
      )}
    </div>
  );
}

export default SearchPage;
