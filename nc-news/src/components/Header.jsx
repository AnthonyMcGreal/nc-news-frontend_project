import { Link } from 'react-router-dom'

const Header = ({user, setIsLoggedIn, setUser}) => {
    return (
        <div className="header">
            <h1>NorthCoders News!!</h1>
            {user?
            <p>currently logged in as : {user}</p>:
            <p>Please log in</p>}

            {user?<button onClick={() => {
                setIsLoggedIn(false) 
                setUser(null)}}
                >logout</button>:null}

            {user? null: <Link to="/home">
              <button>Login</button>
            </Link>}
        </div>
    );
};

export default Header;