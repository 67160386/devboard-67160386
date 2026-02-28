function PostCount({ count }) {
  return (
    <p
      style={{
        color: "gray",
      }}
    >
      โพสต์ทั้งหมด: {count} รายการ
    </p>
  );
}

export default PostCount;
