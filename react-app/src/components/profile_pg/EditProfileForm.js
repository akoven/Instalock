import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { editProfileParams, deleteProfile } from "../../store/profile";
import { authenticate } from "../../store/session";
import './editProfile.css';
// import './unnamed.jpg' ;

const EditProfileForm = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const userProfile = useSelector(state => state.profile);

    const [username, setUsername] = useState(currentUser?.username)
    const [website, setWebsite] = useState(currentUser?.website)
    const [bio, setBio] = useState(currentUser?.bio)
    const [email, setEmail] = useState(currentUser?.email)
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone_number)
    const [gender, setGender] = useState(currentUser?.gender)
    const [profileImageUrl, setProfileImageUrl] = useState(currentUser?.profile_image_url)

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
        dispatch(authenticate())
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
        <div className="edit-profile-page">
            <div className="edit-profile-upper">
                <div className="edit-profile-img">
                    {currentUser?.profile_image_url ? (
                        <img className='profileEdit-image' src={profileImageUrl ? profileImageUrl : ''} alt="" />
                      ) : (
                        <img className='profileEdit-image' src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
                        )}
                </div>
                <div className="profile-edit-username">{username}</div>
            </div>
            <div className="edit-profile-lower">
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div>
                        <p>Username</p>
                        <input
                                type="string"
                                value={username ? username : ''}
                                onChange={e => setUsername(e.target.value)}
                                required/>
                    </div>
                    <div>
                        <p>Profile Image</p>
                        <input
                                type="string"
                                value={profileImageUrl ? profileImageUrl : ''}
                                onChange={e => setProfileImageUrl(e.target.value)}
                                />
                    </div>
                    <div>
                        <p>Website</p>
                        <input
                                type="string"
                                value={website?website:''}
                                onChange={e => setWebsite(e.target.value)}/>
                    </div>
                    <div>
                        <p>Bio</p>
                        <textarea
                                type="text"
                                value={bio?bio:''}
                                onChange={e => setBio(e.target.value)}/>
                    </div>
                    <div>
                        <p>Email</p>
                        <input
                                type="string"
                                value={email?email:''}
                                onChange={e => setEmail(e.target.value)}
                                required/>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <input
                                type = "string"
                                value={phoneNumber?phoneNumber:''}
                                onChange={e => setPhoneNumber(e.target.value)}
                                />
                    </div>
                    <div className="gender-edit-field">
                        <p className="gender-header">Gender</p>
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
                    </div>
                    <button className="edit-profile-submit" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
// {/* <button onClick={() => deleteProfile(currentUser.id)} disabled={true}><div className="delete">Delete</div></button> */}


export default EditProfileForm;

        // <div className="main-form">
        //     <div className="profile-header">
        //         <div className="profile-img">
        //             {currentUser?.profile_image_url ? (
        //                 <img className='profileEdit-image' src={profileImageUrl ? profileImageUrl : ''} alt="" />
        //               ) : (
        //                 <img className='profileEdit-image' src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
        //               )
        //               }
        //         </div>
        //         <div className="profile-edit-username">{username}</div>
        //     </div>
        //     <form className="edit-profile-form" onSubmit={handleSubmit}>
        //         <div className="username-edit">
        //             <label>Username
        //                 <input
        //                 type="string"
        //                 value={username ? username : ''}
        //                 onChange={e => setUsername(e.target.value)}
        //                 required/>
        //             </label>
        //         </div>
        //         <div className="profile-image-edit">
        //             <label>Profile Image
        //                 <input
        //                 type="string"
        //                 value={profileImageUrl ? profileImageUrl : ''}
        //                 onChange={e => setProfileImageUrl(e.target.value)}
        //                 />
        //             </label>
        //         </div>
        //         <div className="website-edit">
        //             <label>Website
        //                 <input
        //                 type="string"
        //                 value={website?website:''}
        //                 onChange={e => setWebsite(e.target.value)}/>
        //             </label>
        //         </div>
        //         <div className="bio-edit">
        //             <label>Bio
        //                 <textarea
        //                 type="text"
        //                 value={bio?bio:''}
        //                 onChange={e => setBio(e.target.value)}/>
        //         </label>
        //         </div>
        //         <div className="email-edit">
        //             <label>Email
        //                 <input
        //                 type="string"
        //                 value={email?email:''}
        //                 onChange={e => setEmail(e.target.value)}
        //                 required/>
        //             </label>
        //         </div>
        //         <div className="phone-edit">
        //             <label>Phone Number
        //                 <input
        //                 type = "string"
        //                 value={phoneNumber?phoneNumber:''}
        //                 onChange={e => setPhoneNumber(e.target.value)}
        //                 />
        //             </label>
        //         </div>
        //         <div className="gender-edit">

        //             <label>Gender
        //                     <input
        //                     type="radio"
        //                     value={"Female"}
        //                     onChange={e => setGender(e.target.value)}
        //                     checked={gender === "Female" ? "checked":""}
        //                     />Female

        //                     <input
        //                     type="radio"
        //                     value={"Male"}
        //                     onChange={e => setGender(e.target.value)}
        //                     checked={gender === "Male" ? "checked":""}
        //                     />Male

        //                     <input
        //                     type="radio"
        //                     value={"Custom"}
        //                     onChange={e => setGender(e.target.value)}
        //                     checked={gender === "Custom" ? "checked":""}
        //                     />Custom

        //                     <input
        //                     type="radio"
        //                     value={"Prefer not to say"}
        //                     onChange={e => setGender(e.target.value)}
        //                     checked={gender === "Prefer not to say" ? "checked":""}
        //                     />Prefer not to say
        //             </label>
        //         </div>
        //         <div>
        //             <span className="submit-and-delete-buttons">
        //                 <button type="submit"><div className="submit">Submit</div></button>
        //             </span>
        //         </div>
        //     </form>
        // </div>
