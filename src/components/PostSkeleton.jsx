{
  /* task1 challenge3 - postskeleton component */
}
function PostSkeleton() {
  return (
    <>
      {[1, 2, 3].map(() => (
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "#e2e8f0",
            height: "5rem",
          }}
        >
          <h3
            style={{
              margin: "0px 0px 0.5rem",
              background: "gray",
              width: "60%",
              height: "1rem",
            }}
          ></h3>
          <p
            style={{
              background: "gray",
              width: "75%",
              height: "1rem",
              opacity: "50%",
            }}
          ></p>
          <p
            style={{
              background: "gray",
              width: "90%",
              height: "1rem",
              opacity: "50%",
              marginBottom: "0",
            }}
          ></p>
        </div>
      ))}
    </>
  );
}

export default PostSkeleton;
