import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

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
                        <NavLink to={`/profile/${followed.id}`}>
                            <div className="follow-display-profpic-container">
                                <img src={followed.profile_image_url} alt="ProfilePic" />
                            </div>
                            <div>
                                <div>{followed.username}</div>
                            </div>
                        </NavLink>
                        {/* <RemoveFollower /> */}
                    </div>
                )})}
            </div>
        </div>
    )
}

export default FollowingDisplay
