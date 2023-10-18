import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Posts = ({userId}) => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts/timeline?userId="+ currentUser.id).then((res) => {
      return res.data;
    })
  );
  if(data) {
    data.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
  }

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
