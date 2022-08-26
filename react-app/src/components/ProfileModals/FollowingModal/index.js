import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../../context/Modal'
import FollowingDisplay from './FollowingDisplay'
import './FollowingDisplay.css'

function FollowingDisplayModal() {
    const [showModal, setShowModal] = useState(false)
    const followingCount = useSelector(state => state.follows.following_count)

    return (
        <>
        <div className='following-button' onClick={() => setShowModal(true)}>following</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <FollowingDisplay onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default FollowingDisplayModal
