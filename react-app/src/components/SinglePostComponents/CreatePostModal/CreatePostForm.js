import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../../store/post";
import "./CreatePost.css";

function CreatePostForm({ post, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const user = useSelector((state) => state.session.user);

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState([]);



  useEffect(() => {
    const newErrors = [];
    if (caption?.length > 2200) {
      newErrors.push("Caption character limit of 2200 exceeded.");
    }
    // if (!imageUrl) {
    //   newErrors.push("Image URL is required!");
    // }
    if (!caption) {
      newErrors.push("Caption is required!");
    }

    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
  }, [caption, imageUrl]);

  useEffect(() => {
    console.log(image)
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("image", image);
    const payload = {
      user_id: user.id,
      caption: caption,
      image,
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

  // let file;
  // function previewFile() {
  //   let fileInput = document.querySelector('input[type=file]');
  //   const preview = document.querySelector('.test-img');
  //   file = fileInput?.files[0]


  //     const reader = new FileReader();

  //     reader.addEventListener("load", () => {
  //       // convert image file to base64 string
  //       preview.src = reader.result;
  //       setImageUrl(preview.src)
  //     }, false);

  //     if (file) {
  //       reader.readAsDataURL(file);
  //     }
  // }

  const updateFiles = (e) => {
    e.stopPropagation()
    const file = e.target.files[0];
    setImage(file);
    return
  }

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
              disabled={errors.length > 0}
            >
              Share
            </button>
          </div>
        </div>
<<<<<<< HEAD
        {imagePreview ? (
          <div className="create-img-container">
            <div className="img-container">
              <img className="create-post-preview"
                src={imagePreview}
                alt=""
                />
              <div onClick={() => setImagePreview('')} className="remove-image">X</div>
            </div>
            <div className="post-form">
=======
        <div className="create-img-container">
          <div className="img-container">
            <img className="create-post-preview"
              src={imageUrl}
              alt="Your image Will Load Here!"
            />
          </div>
          <div className="post-form">
>>>>>>> main
            <div className="user-post-info">
              {user.profile_image_url ? (
                <img
                className="user-post-image"
                src={user.profile_image_url}
                alt=""
                />
              ) : (
                <img className='user-post-image'
                src="https://i.imgur.com/vF8FTS2.png"
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
          ) : (
            <div className="image-input-div">
              <label className='one-label' htmlFor="upload-image-input">
                <div className="img-icon-and-button">
                  <img className="upload-img-icon" src="https://i.imgur.com/ZMKDt54.png" alt="" />
                  <div className="image-upload-button">Select from computer</div>
                </div>

                <input
                id="upload-image-input"
                type="file"
                onChange={ (e) => {
                  updateFiles(e)
                  setImagePreview(URL.createObjectURL(e.target.files[0]))
                }} />
              </label>
            </div>
          )}
      </div>
    </>
  );
}

export default CreatePostForm;
