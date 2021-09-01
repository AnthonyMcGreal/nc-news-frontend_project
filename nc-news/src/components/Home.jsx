import { useState } from 'react';
import { getUser } from '../api';

const Home = ({setIsLoggedIn,setUser}) => {

    const [selection, setSelection]= useState(null)
    

    function login(){
       getUser(selection).then((response)=>{
            setUser(selection)
            setIsLoggedIn(true)
        }).catch((error)=>{
            if(error.response.status === 404){
                console.log('inside error handler')
                return (<p>User doesnt exist</p>)
            }
        })
        
    }
    return (
        <div>
            <label htmlFor='users'>Please log in as a user
                <select onChange={(event) => {setSelection(event.target.value)}} name='users' id='users'>
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
        </div>
    );
};

export default Home;