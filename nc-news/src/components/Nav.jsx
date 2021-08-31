import { Link } from 'react-router-dom';

const Nav = () => {

    // function goToTopics(){
    //     console.log('inside function')
    //     return <Redirect to="/" />
    // }


    return (
        <div className="Nav">
            <Link to="/">
              <button>Topics</button>
            </Link>
            <Link to="/users">
              <button>Users</button>
            </Link>
        </div>
    );
};

export default Nav;