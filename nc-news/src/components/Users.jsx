import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../api';

const Users = ({isLoggedIn}) => {

    const [users,setUsers] = useState([])

    useEffect(()=> {
        getUsers().then((response)=>{
            setUsers(response)
        })
    },[])
    if(!isLoggedIn) return <div>Please Log in to view this page</div>
    if(users.length ===0) return 'Loading Users....'

    return (
        <div className="users">
                {users.map((user) => {
                    return (
                            <Link key={user.username} className="user" to={`/user?username=${user.username}`}>
                            {user.username}
                            </Link>
                    )})}
        </div>
    );
};

export default Users;