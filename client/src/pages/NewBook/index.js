import React ,{useState,useEffect}from "react";
import { useNavigate, useParams ,Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";
import api from '../../services/api'
import Notification from "../../Components/Notification";
import './style.css';


export default function NewBook(){

    const [id, setId] = useState(null);
    const [Title, setTitle] = useState('');
    const [Author, setAuthor] = useState('');
    const [Price, setPrice] = useState('');
    const [launchDate , setDate] = useState('');
    const { bookId } = useParams();
    const navegate = useNavigate();
    const accessToken = localStorage.getItem('accessToken')

    const authorization = {
        headers:{
            Authorization:`Bearer ${accessToken}`
         }
    }
    useEffect(()=>{
        if(bookId ==='0') return  setTitle(''),setAuthor(''),setPrice(''),setDate('');
        else loadBook();
    },[bookId])
    async function loadBook(){
        try {
            const response =  await api.get(`/api/Book/v1/${bookId}`,authorization)
            let launchDate = response.data.launchDate.split("T",10)[0];
            
            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setDate(launchDate);
            Notification('info',`Interface Update the Book ${bookId}`);
            
        } catch (error) {
            Notification('error',"Error recovering Book!");
            navegate('/book');
        }
    }
    async function SaveOrUpdate(e){
        e.preventDefault();

        const data = {
            Title,
            Author,
            launchDate,
            Price
        };
        var msg
        try {
            if(bookId == 0){
                await api.post('api/Book/v1',data,authorization)
                msg ="Book Create the Success"
            }else{
                data.id = id;
                await api.put('api/Book/v1',data,authorization)
                msg ="Book Update the Success"
            }
            Notification('success',msg);

            } catch (error) {
                alert('create failed:'+error)
            }
        navegate('/book');
    }
   

    return(
        <div className="new-container">
           <div className="barraTitle">
               <div> <ImBooks size={45} color="white" /> <h2>New Book</h2> </div> 
               <Link className="btn btn-outline-light" to="/book">Home</Link>
            </div>

            <div className="Painel">
                <div border="dark" className="card border-dark">
                        <div className="card-body">
                            <div className="card-Text">
                            <form onSubmit={SaveOrUpdate}>
                                <div className="form-group mb-1" >
                                    <label >Title</label>
                                    <input type="text" value={Title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="form-group mb-1">
                                    <label >Author</label>
                                    <input type="text" value={Author} onChange={e => setAuthor(e.target.value)}/>
                                </div>
                                <div className="row mb-3">
                                    <div className=" col mb-1"  >
                                        <label >Price</label>
                                        <input type="number" value={Price} placeholder="R$0,00" onChange={e => setPrice(e.target.value)}/>
                                    </div>
                                
                                    <div className="col mb-1">
                                        <label >Date</label>
                                        <input type="date" value={launchDate} onChange={e => setDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="groupButton">
                                    <button  className="btn btn-success" type="submit" >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    );
}