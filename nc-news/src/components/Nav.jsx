import { useHistory } from 'react-router-dom';

const Nav = ({user, setIsLoggedIn, setUser}) => {

const history = useHistory()
    return (
        <div className="Nav">
              <button onClick={() => history.push("/home")}>Home</button>
              <button onClick={() => history.push("/topics")}>Topics</button>
              <button onClick={() => history.push("/users")}>Users</button>
        
            {user?<button onClick={() => {
                setIsLoggedIn(false) 
                setUser(null)}}
                >Logout</button>:null}
        </div>
    );
};

export default Nav;