import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ฟังก์ชันสำหรับดึงข้อมูล (ดึงออกมาเพื่อให้เรียกใช้ซ้ำได้ เช่น ปุ่ม Refresh)
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]); // ถ้า URL เปลี่ยน จะดึงข้อมูลใหม่ทันที

  // ส่งค่าที่ Component จำเป็นต้องใช้ออกไป
  // รวมถึงส่ง fetchData ออกไปด้วยเพื่อให้ Component สั่ง Re-fetch ได้ (เช่น ปุ่มโหลดใหม่)
  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
