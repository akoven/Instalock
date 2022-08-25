import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../context/Modal";
import CreatePostForm from "./CreatePostForm";
import "./CreatePost.css"

function CreatePostModal({ post }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}>
        <i class="fa-regular fa-square-plus fa-xl"></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm post={post} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
