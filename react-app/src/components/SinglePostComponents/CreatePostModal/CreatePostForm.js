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
  const [showModal, setShowModal] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validations = () => {
    let errors = [];
    if (!caption) errors.push("Please enter a caption");
    if (!imageUrl) errors.push("Please enter an image URL");
    if (caption.length > 30)
      errors.push("Character limit of 30 has been reached.");
    // if (imageUrl.length > 255)
    //   errors.push(
    //     "Please include a different image URL that is less than 255 characters"
    //   );
    return errors;
  };

  useEffect(() => {
    
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      user_id: user.id,
      caption: caption,
      image_url: imageUrl,
    };

    const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onClick();
    return dispatch(createPost(payload))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .then(setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

    // let updatedPost = await dispatch(createPost(payload));
    // if (updatedPost) {
    //   history.push(`/`);
    // }
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
              {errors ?? (
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
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
