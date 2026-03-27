import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
// task3 challenge3 - custom hook: usefetch
import useFetch from "../hooks/useFetch";

function UserList() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <LoadingSpinner />;

  if (error) return <div>เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div>
      <h2
        style={{
          // color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
