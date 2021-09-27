import { useHistory } from 'react-router-dom'

const Header = ({user}) => {

    const history = useHistory()
    return (
        <div className="header">
            <div className="header-wrap">
            <h1>NorthCoders News</h1>
            {user?
            <p>Currently logged in as : {user}</p>:
            user? null: 
              <button onClick={() => history.push("/home")}>Login</button>}
           </div>
        </div>
    );
};

export default Header;