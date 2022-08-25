import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editProfileParams } from "../../store/profile";

const EditProfileForm = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    // const {userId} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const userProfile = useSelector(state => state.profile);

    const [username, setUsername] = useState(userProfile?.profile?.username)
    const [website, setWebsite] = useState(userProfile?.profile?.website)
    const [bio, setBio] = useState(userProfile?.profile?.bio)
    const [email, setEmail] = useState(userProfile?.profile?.email)
    const [phoneNumber, setPhoneNumber] = useState(userProfile?.profile?.phone_number)
    const [gender, setGender] = useState(userProfile?.profile?.gender)

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            username,
            website,
            bio,
            email,
            phoneNumber,
            gender
        }

        const editedProfile = await dispatch(editProfileParams(payload, currentUser.id));

        if(editedProfile){
            history.push('/');
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username
                        <input
                        type="string"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required/>
                    </label>
                </div>
                <div>
                    <label>
                        Website
                        <input
                        type="string"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Bio
                        <textarea
                        type="text"
                        value={bio}
                        onChange={e => setBio(e.target.value)}/>
                </label>
                </div>
                <div>
                    <label>
                        Email
                        <input
                        type="string"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number
                        <input
                        type = "string"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Gender
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
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default EditProfileForm;
