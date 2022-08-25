import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import RemoveFollower from './RemoveFollower'
import './RemoveFollower.css'

function RemoveFollowerModal({ follower, followId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className='remove-follower-button' onClick={() => setShowModal(true)}>Remove</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RemoveFollower onClick={() => setShowModal(false)} follower={follower} followId={followId} />
                </Modal>
            )}
        </>
    )
}

export default RemoveFollowerModal;
