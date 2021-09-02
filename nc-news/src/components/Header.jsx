import { useHistory } from 'react-router-dom'

const Header = ({user}) => {

    const history = useHistory()
    return (
        <div className="header">
            <h1>NorthCoders News!!</h1>
            {user?
            <p>currently logged in as : {user}</p>:
            <p>Please log in</p>}

            {user? null: 
              <button onClick={() => history.push("/home")}>Login</button>}
           
        </div>
    );
};

export default Header;