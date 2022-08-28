import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import RemoveFollowerModal from "../RemoveFollowerModal"
import { getProfileThunk } from "../../../store/profile";
import { getFollowData } from "../../../store/follows";

function FollowingDisplay({ onClick }) {
    const dispatch = useDispatch();
    const following = useSelector(state => Object.entries(state.follows.following))
    const user = useSelector(state => state.session.user)
    const { userId } = useParams();

    const handleClick = (userId) => {
        onClick()
        dispatch(getProfileThunk(userId))
        dispatch(getFollowData(userId))
    }

    return (
        <div className="following-display-container">
            <div className="following-display-top">
                <div>Following</div>
                <i onClick={onClick} class="fa-solid fa-xmark"></i>
            </div>
            <div className="following-display-bottom">
                {following && following.map(follow => {
                    let followed = follow[1]
                    return (
                    <div className="follower-item">
                        <div className="follower-info">
                            <NavLink onClick={() => handleClick(followed.id)} to={`/profile/${followed.id}`} className="follower-link">
                                <div className="follow-display-profpic-container">
                                {followed.profile_image_url ? (
                                    <img className='user-post-image' src={followed.profile_image_url} alt="" />
                                    ) : (
                                    <img src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
                                    )
                                }
                                </div>
                            </NavLink>
                            <NavLink onClick={() => handleClick(followed.id)} to={`/profile/${followed.id}`} className="follower-link">
                                <div>
                                    <div>{followed.username}</div>
                                </div>
                            </NavLink>
                        </div>
                        {user.id == userId && <RemoveFollowerModal follower={followed} followId={follow[0]} />}
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FollowingDisplay
