import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import RemoveFollowerModal from "../RemoveFollowerModal"
import { getProfileThunk } from "../../../store/profile";
import { getFollowData } from "../../../store/follows";

function FollowersDisplay({ onClick }) {
    const dispatch = useDispatch();
    const followers = useSelector(state => Object.entries(state.follows.followers))
    const user = useSelector(state => state.session.user)
    const { userId } = useParams();

    const handleClick = (userId) => {
        onClick()
        dispatch(getProfileThunk(userId))
        dispatch(getFollowData(userId))
    }

    return (
        <div className="followers-display-container">
            <div className="followers-display-top">
                <div>  Followers</div>
                <i onClick={onClick} class="fa-solid fa-xmark"></i>
            </div>
            <div className="followers-display-bottom">
                {followers && followers.map(follow => {
                    let follower = follow[1]
                    return (
                    <div className="follower-item">
                        <NavLink onClick={() => handleClick(follower.id)} to={`/profile/${follower.id}`} className="follower-link">
                            <div className="follow-display-profpic-container">
                            {follower.profile_image_url ? (
                                <img className='user-post-image' src={follower.profile_image_url} alt="" />
                                ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            </div>
                        </NavLink>
                        <NavLink onClick={() => handleClick(follower.id)} to={`/profile/${follower.id}`} className="follower-link">
                            <div>
                                <div>{follower.username}</div>
                            </div>
                        </NavLink>
                        {user.id == userId && <RemoveFollowerModal follower={follower} followId={follow[0]} />}
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FollowersDisplay
