import {useState, useEffect} from 'react'
import { getUser } from '../api';
import { useLocation, useHistory } from 'react-router-dom';

const User = ({isLoggedIn}) => {

    const [userProfile, setUserProfile] = useState([{}])
    const search = useLocation().search;
    const username = new URLSearchParams(search).get('username')
    const history = useHistory()
    
    useEffect(()=>{
       getUser(username).then((response)=> {
          setUserProfile(response)
       })
    },[username])
    if(!isLoggedIn) return <div>Please Log in to view this page</div>
    if(!userProfile[0].hasOwnProperty('username'))return 'Loading profile....'

    return (
        <div className="userProfile">
          <button className="userReturnButton"onClick={() => history.push("/users")}>Return to users</button>
          <img src={userProfile[0].avatar_url} alt='avatar'/>
          <h3>Username : {userProfile[0].username}</h3>
          <p>Name : {userProfile[0].name}</p>
        </div>
    );
};

export default User;