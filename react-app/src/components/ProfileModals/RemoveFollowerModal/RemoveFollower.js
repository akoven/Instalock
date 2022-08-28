import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { getFollowData, removeFollowThunk } from "../../../store/follows";
import { getProfileThunk } from "../../../store/profile";


function RemoveFollower({ follower, followId, onClick }) {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const onDelete = async (followId) => {
        const success = await dispatch(removeFollowThunk(followId))

        if (success) {
            dispatch(getProfileThunk(userId))
            dispatch(getFollowData(userId))
        }
        onClick()
    }

    return (
        <div className="remove-follower-container">
            <div className="remove-follower-head">
                <div className="remove-follower-pic-container">
                    {follower.profile_image_url ? (
                        <img className='user-post-image' src={follower.profile_image_url} alt="" />
                        ) : (
                        <img src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
                        )
                    }
                </div>
                <div className="remove-follower-header">
                    <h2>Remove follower?</h2>
                </div>
            </div>
            <div className="remove-follower-option-button remove" onClick={() => onDelete(followId)}>Remove</div>
            <div className="remove-follower-option-button cancel" onClick={onClick} >Cancel</div>
        </div>
    )
}

export default RemoveFollower
