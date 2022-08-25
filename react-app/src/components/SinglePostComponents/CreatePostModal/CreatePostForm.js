import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../../store/post";
import "./CreatePost.css";

function CreatePostForm({ post, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState(post?.caption);
  const [imageUrl, setImageUrl] = useState(post?.image_url);
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: user.id,
      caption: caption,
      image_url: imageUrl,
    };

    let updatedPost = await dispatch(createPost(payload));
    if (updatedPost) {
      history.push(`/`);
    }
  };

  console.log(user, "POST");

  return (
    <>
      <div className="create-post-form-container">
        <div className="create-post-top-bar">
          <button className="cancel-button" onClick={() => onClick()}>
            Cancel
          </button>
          <div>Create New Post</div>
          <div className="buttonContainer">
            <button className="create-post" type="submit">
              Share
            </button>
          </div>
        </div>
        <div className="create-img-container">
          <img className="preview-image" src={imageUrl} alt="postImage" />
          <div className="post-form">
        <div className="user-post-info">
          {user.profile_image_url ? (
            <img
              className="user-post-image"
              src={user.profile_image_url}
              alt=""
            />
          ) : (
            <img
              src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png"
              alt="Profile"
            />
          )}
          <div>{user.username}</div>
        </div>
            <form className="create-post-form" onSubmit={handleSubmit}>
              <div>
                <label>Image:</label>
                <input
                  type="text"
                  placeholder="Image URL here..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              <div className="caption-div">
                <label>Caption:</label>
                <input
                  type="text"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostForm;
