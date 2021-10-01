import { useState } from 'react';
import { getUser } from '../api';

const Home = ({setIsLoggedIn,setUser, isLoggedIn, user}) => {

    const [selection, setSelection]= useState('')
    

    function login(){
       getUser(selection).then((response)=>{
            setUser(selection)
            setIsLoggedIn(true)
        })
    }
    return (
        <div className="Home">
            {isLoggedIn? null:
            <label htmlFor='users'>Please log in as a user
                <select onChange={(event) => {setSelection(event.target.value)}} name='users' id='users'>
                    <option disabled={selection === ''? false:true}value={selection}>Select a user</option>
                    <option value='tickle122'>tickle122</option>
                    <option value='grumpy19'>grumpy19</option>
                    <option value='happyamy2016'>happyamy2016</option>
                    <option value='cooljmessy'>cooljmessy</option>
                    <option value='weegembump'>weegembump</option>
                    <option value='jessjelly'>jessjelly</option>
                </select>
                <button disabled={selection===''}onClick={login}>Login</button>
            </label>
            }
           {isLoggedIn? <section><p>Welcome back {user}!</p> <p>Use the navigation bar to browse through the site and explore lots of user generated content.</p></section>:<p>Welcome to NorthCoders News</p>}
           {isLoggedIn? null:<p>Login to access all the juicy articles</p>}
        </div>
    );
};

export default Home;