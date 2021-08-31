import { Redirect } from 'react-router-dom';

const Nav = () => {

    function goToTopics(){
        console.log('inside function')
        return <Redirect to="/" />;
    }


    return (
        <div className="Nav">
           <button onClick={(() => {goToTopics()})}>Topics</button>
        </div>
    );
};

export default Nav;