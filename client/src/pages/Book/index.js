import React ,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import { ImBooks } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import BookImg from '../../assets/img/book.jpg';
import api from '../../services/api';
import {Modal} from 'react-bootstrap';
import Notification from "../../Components/Notification";
import './style.css'
export default function Book(){
    const [books,setBooks]=useState([]);
    const [pages,setPages]=useState(1);
    const [id,setId]=useState(0);

    const accessToken = localStorage.getItem('accessToken');
    const navegate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    function  handleShow(id){
        setId(id);        
        setShow(true);
    }

    const authorization = {
        headers:{
            Authorization:`Bearer ${accessToken}`
         }
    }

    useEffect(() => {
        fetchMoreBooks()
    }, [accessToken])
    
    async function fetchMoreBooks(){
        const response = await api.get(`api/Book/v1/asc/2/${pages}`,authorization);
            setBooks([...books,...response.data.list]) 
            setPages(pages + 1); 
    }

    async function deleteBook(id){
        try {
           await api.delete(`api/Book/v1/${id}`,authorization);
             setBooks(books.filter(book => book.id !== id));
             Notification('success','Book Deleted the Success!')
        } catch (error) {
            Notification('error','Erro Delete Book!'+error)
        }
        handleClose();
    }
    async function EditBook(id){
        try {
            navegate(`/books/new/${id}`);
        } catch (error) {
            Notification('error','Erro Edit Book!'+error)
        }
    }
    return (
        <div className="Book-container">
            <div className="barTitleBook">
                <ImBooks size={45} color="white" />
                <h2>Book Gallery</h2> 
            </div>
            <div className="Painel">
                { books.map(book => (

                    <div key={book.id} className='card border-dark' style={{ width: '30rem' }}>
                            <img className="card-img-top"  src={BookImg} />
                        <div className='card-body'>
                                <div className='card-title'>
                                    <p className='title'> {book.title}</p>
                                </div>
                                <div className='card-text'>
                                    <div className='row'>
                                        <div className="col-sm-12">
                                            <label><strong>Author </strong></label>
                                            <p>{book.author}</p>
                                        </div>
                                        <div className="col-12">
                                            <label><strong>Price </strong></label>
                                            <p>R$ {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(book.price)}</p>
                                        </div>
                                        <div className="col-12">
                                            <label>
                                                
                                                </label>
                                                <strong>Release Date:</strong>
                                                 <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="groupButton">
                                    <Button onClick={()=> EditBook(book.id)} variant="primary">
                                        <FiEdit size={20} color="white"/>
                                    </Button>
                                    <Button onClick={()=>handleShow(book.id)} variant="danger">
                                        <FiTrash size={20} color="white"/>
                                    </Button>
                                </div>
                        </div>
                    ))}
                    <button className="btn btn-primary" onClick={fetchMoreBooks}>Load More</button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Delete Book</Modal.Title>
                                </Modal.Header>
                            <Modal.Body>Do you want to delete this book !</Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={()=> deleteBook(id)}>
                                Delete
                            </Button>
                            </Modal.Footer>
                        </Modal>
            </div>


        </div>
    );
}