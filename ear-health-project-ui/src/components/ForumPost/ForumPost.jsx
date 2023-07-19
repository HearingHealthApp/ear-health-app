import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";

const ForumPost = () => {
  const formatTimeSincePost = (timestamp) => {
    const ONE_MINUTE = 60 * 1000; // milliseconds in a minute
    const ONE_HOUR = 60 * ONE_MINUTE; // milliseconds in an hour
    const ONE_DAY = 24 * ONE_HOUR; // milliseconds in a day

    const currentTime = new Date(); // current time
    const postTime = new Date(timestamp); // post creation time

    const timeDifference = currentTime - postTime; // time difference in milliseconds

    // Check if less than a minute
    if (timeDifference < ONE_MINUTE) {
      return "Posted just now";
    }

    // Check if less than an hour
    if (timeDifference < ONE_HOUR) {
      const minutesAgo = Math.floor(timeDifference / ONE_MINUTE);
      return `Posted ${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
    }

    // Check if less than a day
    if (timeDifference < ONE_DAY) {
      const hoursAgo = Math.floor(timeDifference / ONE_HOUR);
      return `Posted ${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
    }

    // For longer durations, you can use libraries like Moment.js for more advanced formatting
    // or implement custom logic to display "posted x days ago" or specific date format

    // Default case
    return `Posted on ${postTime.toLocaleDateString()}`;
  };
  //get the params of the link
  const { postId } = useParams();
  //get the post by using postId

  //useState for the actual post
  const [post, setPost] = useState({});
  const getPost = async () => {
    const { data } = await apiClient.indvPostGetter(postId);

    setPost(data.post);
    console.log(post);
  };

  //call the fetch on page load
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div>
        <h1>{post.title}</h1>
        {post.is_anonymous ? (
        <p>Posted by Anonymous</p>
      ) : (
        <p>Posted by {post.username}</p>
      )}
        <p>{formatTimeSincePost(post.created_at)}</p>
        <p>{post.category}</p>
        <h2>{post.content}</h2>
      </div>

      <div>
        <h1>Comments: </h1>

      </div>
    </div>
  );
};

export default ForumPost;