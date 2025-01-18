import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);

  const navigate = useNavigate();

  const handleClick = async () => {
    await fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    });

    navigate("/");
  };
  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <div className="delete">
            <div>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </div>
            <div>
              <button onClick={handleClick}>&#x2716;</button>
            </div>
          </div>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
