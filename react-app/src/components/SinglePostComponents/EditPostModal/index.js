import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../../context/Modal'
import EditPostForm from './EditPostForm'
import './EditPost.css'

function EditPostModal({ post }) {
    // const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='edit-post-button' onClick={() => setShowModal(true)}>Edit</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditPostForm post={post} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default EditPostModal
