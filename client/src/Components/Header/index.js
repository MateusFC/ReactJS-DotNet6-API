import React from "react";
import { IoBookOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { RiHealthBookLine } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";
import './style.css';
import api from "../../services/api";
export default function Header(){
    
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers:{
            Authorization:`Bearer ${accessToken}`
         }
    }

    async function logout(){
            try {
                await api.get('/api/Auth/v1/revoke',authorization);
                  localStorage.clear();
                  navigate('/');
        } catch (error) {
            alert("Error logout "+error)
        }
    }
    return(
        <div className="header-container">
            {!accessToken  ? '' : 
            <header>
                <div>
                    <IoBookOutline className="img" size={50} color="white"/>
                </div>
                <div>
                    <span>Welcome, <strong>Mateus </strong>!</span>
                </div>
                <div>
                    <Link className="btn btn-outline-secondary" to="/books/new/0">
                        <RiHealthBookLine size={30} color="white"/>
                        <span>Add New Book</span>
                    </Link>
                    <a className="btn btn-outline-secondary" style={{width:'60px',padding:'8px'}} onClick={logout} >
                        <BiLogIn size={30} color="white"/>
                    </a>
                </div>
            </header>
        }
        </div>
    );
}