import { NextPage } from 'next';
import { HeaderComponent, ProfileComponent } from '../../components';
import { AppView } from '../../views/app';


const Profile:NextPage = () => {

    return (
        <AppView
            header = { <HeaderComponent /> }
            content = { <ProfileComponent /> }
        />
    )
};

export default Profile;
