import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import PostOptions from './PostOptions'

function PostOptionsModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='post-options-button' onClick={setShowModal(true)}><i className='fa-solid fa-ellipsis'></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostOptions />
                </Modal>
            )}
        </>
    )
}
