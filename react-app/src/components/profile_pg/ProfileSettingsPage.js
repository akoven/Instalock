import {deleteProfile, editProfileParams} from '../../store/profile';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProfileSettingsPage = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const userProfile = useSelector(state => state.profile)
    const userSession = useSelector(state => state.session.user)


    return(
        <>
            <button onClick={() => history.push(`/profile/${userSession.id}`)}>Edit my profile</button>
            <button onClick={() => dispatch(deleteProfile(userProfile.id))}>Delete my profile</button>
        </>
    )

}
