import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import EditPostForm from './EditPostForm'

function EditPostModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='edit-post-button' onClick={setShowModal(true)}>Edit</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm />
                </Modal>
            )}
        </>
    )
}
