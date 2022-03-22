import React ,{useState}from "react";
import {useNavigate} from 'react-router-dom';
import api from '../../services/api'
import { IoBookOutline } from "react-icons/io5";
import './style.css'


export default  function Login(){
    
    const[userName,setUserName]=useState('');
    const[password,setpassword]=useState('');
    const history = useNavigate();

   async function login(e){
        e.preventDefault();
        const data ={ 
            password,
            userName,
        };
        try {
           const response = await api.post('api/Auth/v1/signin', data);
           localStorage.setItem('userName',userName);
           
           localStorage.setItem('accessToken',response.data.accessToken);
           localStorage.setItem('refreshToken',response.data.refreshToken); 
           history('/book')

        } catch (error) {
            alert('Login Failed!:'+error);
        }

    }


    return(
        <div className="login-container">
            <section className="form">
                <IoBookOutline className="img" size={100} color="white"/>
            <form onSubmit={login}>
                <h1>Access the books</h1>
                <input type="text"  placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e =>setpassword(e.target.value)} />
                <button type="submit" className=" btn btn-outline-secondary " >Login</button>
            </form>
            </section>
        </div>
    );
}