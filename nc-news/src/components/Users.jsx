import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../api';

const Users = () => {

    const [users,setUsers] = useState([])

    useEffect(()=> {
        getUsers().then((response)=>{
            setUsers(response)
        })
    },[])

    if(users.length ===0) return 'Loading Users....'

    return (
        <div>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.username}>
                            <Link to={`/users/${user.username}`}>
                            {user.username}
                            </Link>
                        </li>
                    )})}
            </ul>
        </div>
    );
};

export default Users;