import { useHistory } from 'react-router-dom';

const Nav = ({user, setIsLoggedIn, setUser}) => {

const history = useHistory()
    return (
        <div className="left">
        <div className="Nav">
              <button onClick={() => history.push("/")}>Home</button>
              <button onClick={() => history.push("/topics")}>Articles</button>
              <button onClick={() => history.push("/users")}>Users</button>
        
            {user?<button onClick={() => {
                setIsLoggedIn(false) 
                setUser(null)}}
                >Logout</button>:null}
        </div>
        </div>
    );
};

export default Nav;