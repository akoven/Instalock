

function FollowersDisplay({ followers, onClick }) {


    return (
        <div className="followers-display-container">
            <div className="followers-display-top">
                <div>Followers</div>
                <i onClick={onClick} class="fa-solid fa-xmark"></i>
            </div>
            <div className="followers-display-bottom">
                {followers && followers.map(follower => (
                    <div className="follower-item">
                        <NavLink to={`/profile/${follower.id}`}>
                            <div className="follow-display-profpic-container">
                                <img src={follower.profile_image_url} alt="https://img.icons8.com/plumpy/24/000000/user-male-circle.png" />
                            </div>
                            <div>
                                <div>{follower.username}</div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    )
}
