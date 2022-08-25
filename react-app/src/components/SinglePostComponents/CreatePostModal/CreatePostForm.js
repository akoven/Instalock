import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../../store/post";

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

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <label>Caption:</label>
        <input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </div>
      <div className="buttonContainer">
          <button className="createPost" type="submit">
            Create Post
          </button>
        </div>
    </form>
  );
}

export default CreatePostForm;
