import { Link } from "react-router-dom";

const BlogList = ({ blogs, onDelete }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <div className="blog-delete">
            <Link to={`/blogs/${blog.id}`}>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </Link>
          </div>
          <div>
            <button onClick={() => {onDelete(blog.id)}}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
