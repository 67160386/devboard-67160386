// task4 challenge3 - favorites remain
import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  // task4 challenge3 - favorites remain
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

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
