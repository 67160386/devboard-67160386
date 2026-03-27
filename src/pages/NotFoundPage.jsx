// task4 challenge1 - page 404
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
