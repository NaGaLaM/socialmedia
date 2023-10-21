import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";


const Posts = ({ userId }) => {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error } = useQuery(["posts"], () =>
    makeRequest.get(`/posts/timeline?userId=${currentUser.id}`).then((res) => {
      setData(res.data);
      setLength(data.length);
      return res.data;
    })
  );

  const fetchData = () => {
    if (data.length > length && data.length >= 10) {
      makeRequest.get(`/posts/timeline?userId=${currentUser.id}&offset=${data?.length}`).then((res) => {
        setData(data => [...data, ...res.data])
        setLength(data.length);
        return res.data;
      })
    }
  }


  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100 && !isLoading) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
          ? "loading"
          : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
