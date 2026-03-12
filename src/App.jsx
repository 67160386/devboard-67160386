import "./App.css";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import UserCard from "./components/UserCard";
import AddPostForm from "./components/AddPostForm";
import UserList from "./components/UserList";

// task2 challenge3 - favorites remain
import { useState, useEffect } from "react";

function App() {
  // task2 challenge3 - favorites remain
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites"); // ดึงข้อมูลมาใช้
    return saved ? JSON.parse(saved) : [];
  }); // เก็บ id ที่ถูกใจ

  useEffect(
    () => {
      localStorage.setItem("favorites", JSON.stringify(favorites)); // บันทึกข้อมูล
    },
    [favorites], // ให้บันทึกตอนที่ favorites เปลี่ยนแปลงเท่านั้น
  );

  // Toggle ถูกใจ/ยกเลิก
  function handleToggleFavorite(postId) {
    setFavorites(
      (prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId) // ลบออก
          : [...prev, postId], // เพิ่มเข้า
    );
  }

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />
      <div
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
        }}
      >
        {/* คอลัมน์ซ้าย: โพสต์ */}
        <div>
          <AddPostForm onAddPost={() => {}} /> {/* จะเชื่อมใน wk14 */}
          <PostList
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* คอลัมน์ขวา: สมาชิก */}
        <div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;
