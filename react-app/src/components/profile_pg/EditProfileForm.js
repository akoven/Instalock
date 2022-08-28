import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { editProfileParams, deleteProfile } from "../../store/profile";
import './editProfile.css';
// import './unnamed.jpg' ;

const EditProfileForm = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const userProfile = useSelector(state => state.profile);

    const [username, setUsername] = useState(userProfile?.profile?.username)
    const [website, setWebsite] = useState(userProfile?.profile?.website)
    const [bio, setBio] = useState(userProfile?.profile?.bio)
    const [email, setEmail] = useState(userProfile?.profile?.email)
    const [phoneNumber, setPhoneNumber] = useState(userProfile?.profile?.phone_number)
    const [gender, setGender] = useState(userProfile?.profile?.gender)
    const [profileImageUrl, setProfileImageUrl] = useState(userProfile?.profile?.profile_image_url)

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            username,
            website,
            bio,
            email,
            phoneNumber,
            gender,
            profile_image_url: profileImageUrl
        }

        const editedProfile = await dispatch(editProfileParams(payload, currentUser.id));

        if(editedProfile){
            history.push(`/profile/${currentUser.id}`);
        }
        else{

            console.log('PAYLOAD ',payload)
            console.log('something went wrong')
            console.log('userId: ', currentUser.id)
        }
    }
    // <div className="side-bar">
    //             <ul>
    //                 <li><NavLink to={`/profile/edit/${userId}`}>Edit Profile</NavLink></li>
    //                 {/* <li>test</li>
    //                 <li>test</li>
    //                 <li>test</li> */}
    //             </ul>
    //     </div>

    return(
        <>

        <div className="main-form">
            <div className="profile-header">
                <div className="profile-img">
                    {userProfile?.profile?.profile_image_url ? (
                        <img className='profileEdit-image' src={profileImageUrl ? profileImageUrl : ''} alt="" />
                      ) : (
                        <img className='profileEdit-image' src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
                      )
                      }
                </div>
                <div className="profile-edit-username">{username}</div>
            </div>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <div className="username-edit">
                    <label>Username
                        {/* <span className="user-label"> Username</span> */}
                        <input
                        type="string"
                        value={username ? username : ''}
                        onChange={e => setUsername(e.target.value)}
                        required/>
                    </label>
                </div>
                <div className="profile-image-edit">
                    <label>Profile Image
                        {/* <span className="profile-image-label">Profile Image</span> */}
                        <input
                        type="string"
                        value={profileImageUrl ? profileImageUrl : ''}
                        onChange={e => setProfileImageUrl(e.target.value)}
                        required/>
                    </label>
                </div>
                <div className="website-edit">
                    <label>Website
                    {/* <span className="website-label">Website</span> */}
                        <input
                        type="string"
                        value={website?website:''}
                        onChange={e => setWebsite(e.target.value)}/>
                    </label>
                </div>
                <div className="bio-edit">
                    <label>Bio
                        {/* <span className="bio-label">Bio</span> */}
                        <textarea
                        type="text"
                        value={bio?bio:''}
                        onChange={e => setBio(e.target.value)}/>
                </label>
                </div>
                <div className="email-edit">
                    <label>Email
                        {/* <span className="email-label">Email</span> */}
                        <input
                        type="string"
                        value={email?email:''}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                    </label>
                </div>
                <div className="phone-edit">
                    <label>Phone Number
                        {/* <span className="phone-label">Phone Number</span> */}
                        <input
                        type = "string"
                        value={phoneNumber?phoneNumber:''}
                        onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </label>
                </div>
                <div className="gender-edit">

                    <label>Gender
                            <input
                            type="radio"
                            value={"Female"}
                            onChange={e => setGender(e.target.value)}
                            checked={gender === "Female" ? "checked":""}
                            />Female

                            <input
                            type="radio"
                            value={"Male"}
                            onChange={e => setGender(e.target.value)}
                            checked={gender === "Male" ? "checked":""}
                            />Male

                            <input
                            type="radio"
                            value={"Custom"}
                            onChange={e => setGender(e.target.value)}
                            checked={gender === "Custom" ? "checked":""}
                            />Custom

                            <input
                            type="radio"
                            value={"Prefer not to say"}
                            onChange={e => setGender(e.target.value)}
                            checked={gender === "Prefer not to say" ? "checked":""}
                            />Prefer not to say
                    </label>
                </div>
                <div>
                    <span className="submit-and-delete-buttons">
                        <button type="submit"><div className="submit">Submit</div></button>
                        {/* <button onClick={() => deleteProfile(currentUser.id)} disabled={true}><div className="delete">Delete</div></button> */}
                    </span>
                    {/* <span className="delete-button">
                    </span> */}
                </div>
            </form>
        </div>
        </>
    )
}


export default EditProfileForm;
