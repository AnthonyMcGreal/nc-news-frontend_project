import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { getUser } from '../api';

const User = ({isLoggedIn}) => {

    const [userProfile, setUserProfile] = useState([{}])
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('username')
    
    useEffect(()=>{
       getUser(username).then((response)=> {
          setUserProfile(response)
       })
    },[username])
    if(!isLoggedIn) return <div>Please Log in to view this page</div>
    if(!userProfile[0].hasOwnProperty('username'))return 'Loading profile....'

    return (
        <div>
          <h3>{userProfile[0].username}</h3>
          <img src={userProfile[0].avatar_url} alt='avatar'/>
          <p>{userProfile[0].name}</p>
        </div>
    );
};

export default User;