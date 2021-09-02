import { useState } from 'react';
import { getUser } from '../api';

const Home = ({setIsLoggedIn,setUser, isLoggedIn, user}) => {

    const [selection, setSelection]= useState('')
    

    function login(){
       getUser(selection).then((response)=>{
            setUser(selection)
            setIsLoggedIn(true)
        }).catch((error)=>{
            if(error.response.status === 404){
                console.log('inside error handler')
                return (<p>User doesn't exist</p>)
            }
        })
        
    }
    return (
        <div className="Home">
            <label htmlFor='users'>Please log in as a user
                <select onChange={(event) => {setSelection(event.target.value)}} name='users' id='users'>
                    <option disabled value=''>Select a user</option>
                    <option value='tickle122'>tickle122</option>
                    <option value='grumpy19'>grumpy19</option>
                    <option value='happyamy2016'>happyamy2016</option>
                    <option value='cooljmessy'>cooljmessy</option>
                    <option value='weegembump'>weegembump</option>
                    <option value='jessjelly'>jessjelly</option>
                    <option value='wrongaccount'>wrongaccount</option>
                </select>
                <button onClick={login}>Login</button>
            </label>
           {isLoggedIn? <p>Welcome back {user}!!</p>:<p>Welcome to NorthCoders News</p>}
           {isLoggedIn? null:<p>Login to access all the juicy news</p>}
        </div>
    );
};

export default Home;