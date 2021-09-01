import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <div className="Nav">
          <Link to="/home">
              <button>Home</button>
            </Link>
            <Link to="/topics">
              <button>Topics</button>
            </Link>
            <Link to="/users">
              <button>Users</button>
            </Link>
        </div>
    );
};

export default Nav;