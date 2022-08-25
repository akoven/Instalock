import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

function FollowersDisplay({ onClick }) {
    const followers = useSelector(state => Object.entries(state.follows.followers))

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
                        <NavLink onClick={onClick} to={`/profile/${follower.id}`} className="follower-link">
                            <div className="follow-display-profpic-container">
                            {follower.profile_image_url ? (
                                <img className='user-post-image' src={follower.profile_image_url} alt="" />
                                ) : (
                                <img src="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" alt="Profile"/>
                                )
                            }
                            </div>
                        </NavLink>
                        <NavLink onClick={onClick} to={`/profile/${follower.id}`} className="follower-link">
                            <div>
                                <div>{follower.username}</div>
                            </div>
                        </NavLink>
                        {/* <RemoveFollower /> */}
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FollowersDisplay
