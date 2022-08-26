import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import RemoveFollowerModal from "../RemoveFollowerModal"

function FollowingDisplay({ onClick }) {
    const following = useSelector(state => Object.entries(state.follows.following))

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
                        <NavLink onClick={onClick} to={`/profile/${followed.id}`} className="follower-link">
                            <div className="follow-display-profpic-container">
                            {followed.profile_image_url ? (
                                <img className='user-post-image' src={followed.profile_image_url} alt="" />
                                ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            </div>
                        </NavLink>
                        <NavLink onClick={onClick} to={`/profile/${followed.id}`} className="follower-link">
                            <div>
                                <div>{followed.username}</div>
                            </div>
                        </NavLink>
                        <RemoveFollowerModal follower={followed} followId={follow[0]} />
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FollowingDisplay
