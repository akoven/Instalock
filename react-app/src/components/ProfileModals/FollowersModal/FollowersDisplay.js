import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

function FollowersDisplay({ onClick }) {
    const followers = useSelector(state => Object.entries(state.follows.followers))

    return (
        <div className="followers-display-container">
            <div className="followers-display-top">
                <div>Followers</div>
                <i onClick={onClick} class="fa-solid fa-xmark"></i>
            </div>
            <div className="followers-display-bottom">
                {followers && followers.map(follow => {
                    let follower = follow[1]
                    return (
                    <div className="follower-item">
                        <NavLink to={`/profile/${follower.id}`}>
                            <div className="follow-display-profpic-container">
                                <img src={follower.profile_image_url} alt="ProfilePic" />
                            </div>
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
