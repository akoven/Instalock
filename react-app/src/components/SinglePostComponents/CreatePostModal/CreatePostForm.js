import React, { useEffect, useState } from "react";
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
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];
    if (caption?.length > 2200) {
      newErrors.push("Caption character limit of 2200 exceeded.");
    }
    if (imageUrl?.length > 255) {
      newErrors.push("Image URL character limit of 255 exceeded.");
    }
    if (!imageUrl) {
      newErrors.push("Image URL is required!");
    }
    if (!caption) {
      newErrors.push("Caption is required!");
    }

    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
  }, [caption, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      caption: caption,
      image_url: imageUrl,
    };

    onClick();
    // return dispatch(createPost(payload))
    //   .then(async (res) => {
    //     setSubmitSuccess(true);
    //   })
    //   .then(setShowModal(false))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });

    let updatedPost = await dispatch(createPost(payload));
    if (updatedPost) {
      history.push(`/`);
      onClick();
    }
  };

  return (
    <>
      <div className="create-post-form-container">
        <div className="create-post-top-bar">
          <button className="cancel-button" onClick={() => onClick()}>
            Cancel
          </button>
          <div>Create New Post</div>
          <div className="buttonContainer">
            <button
              onClick={handleSubmit}
              className="create-post"
              type="submit"
            >
              Share
            </button>
          </div>
        </div>
        <div className="create-img-container">
          <img
            className="preview-image"
            src={imageUrl}
            alt="Your Image Will Load Here!"
          />
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
              {errors && (
                <ul className="create-post-form-errors">
                  {errors.map((error) => {
                    return <li>{`${error}`}</li>;
                  })}
                </ul>
              )}
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
                  type="textarea"
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
