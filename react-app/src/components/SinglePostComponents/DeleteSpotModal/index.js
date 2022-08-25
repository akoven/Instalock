import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../context/Modal'
import DeletePost from './DeletePost'
import './DeletePost.css'

function DeletePostModal({ post }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='delete-post-button' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeletePost post={post} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeletePostModal
