import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { getUser } from '../api';

const User = () => {

    const [userProfile, setUserProfile] = useState({})

    const username = useLocation().pathname.split('/')[2];
    
    useEffect(()=>{
       getUser(username).then((response)=> {
          setUserProfile(response)
       })
    },[username])

    if(!userProfile.hasOwnProperty('username'))return 'Loading profile....'
    console.log(userProfile, username)
    return (
        <div>
          <h3>{userProfile[0].username}</h3>
          <img src={userProfile[0].avatar_url} alt='avatar'/>
          <p>{userProfile[0].name}</p>
        </div>
    );
};

export default User;