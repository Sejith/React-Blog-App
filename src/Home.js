import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method : 'DELETE'
    })
    setFilteredBlogs(filteredBlogs.filter(blog => blog.id !== id))
  }

  useEffect(() => {
    if(blogs) {
      const filtered = blogs.filter(blog => {
        return blog.title.toLowerCase().includes(searchQuery) || blog.author.toLowerCase().includes(searchQuery) || blog.id.toString().includes(searchQuery);
      })
      setFilteredBlogs(filtered);
    }
  },[blogs,searchQuery])
  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search by title, author, or ID"
        value = {searchQuery}
        onChange={handleChange}
        style={{
          padding: "10px",
          margin: "20px 0",
          width: "100%",
          fontSize: "16px",
        }}
      />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {filteredBlogs && <BlogList blogs={filteredBlogs} onDelete = {handleDelete}/>}
    </div>
  );
};

export default Home;
