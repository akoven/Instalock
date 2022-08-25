import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import PostOptions from './PostOptions'

function PostOptionsModal({ post }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='post-options-button' onClick={() => setShowModal(true)}><i className='fa-solid fa-ellipsis'></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostOptions post={post} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default PostOptionsModal;

{/* <img src="https://img.icons8.com/fluency-systems-filled/24/000000/dots-loading.png" alt=""/> */}
