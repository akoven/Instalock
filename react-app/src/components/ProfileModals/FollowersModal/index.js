import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../../../context/Modal'
import FollowersDisplay from './FollowersDisplay'
import './FollowersDisplay.css'

function FollowersDisplayModal() {
    const [showModal, setShowModal] = useState(false)
    const followerCount = useSelector(state => state.follows.follower_count)

    return (
        <>
        <div className='followers-button' onClick={() => setShowModal(true)}>{`${followerCount}`} followers</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <FollowersDisplay onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default FollowersDisplayModal
