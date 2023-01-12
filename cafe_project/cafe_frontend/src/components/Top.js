import React, {useEffect, useState} from 'react';
import {Route, useLocation, useNavigate} from 'react-router-dom';
import {FaSearch, FaUserAlt} from "react-icons/fa";


import CafeService from "./CafeService";

const cafeService = new CafeService();

export default function Top() {

    const user = localStorage.getItem('user')
    // const {signOut} = useAuth();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const [access, setAccess] = useState();
    // const [newMessCount, setNewMessCount] = useState();
    // const [isUpdate, setIsUpdate] = useState(false);
    // console.log(localStorage.getItem('user'));
    // const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     advertBoardService.getCategories().then(function (result) {
    //         console.log(result.data);
    //         setCategories(result.data)
    //     });
    // }, []);


    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="container-fluid">
                <a className='logo' href='/'>
                    <span>Bon Appetit</span>
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Меню</a>
                    </li>
                    <li className="nav-item">
                        <div className="dropdown">
                            <a className="nav-link active" aria-current="page" href="#">Статистика</a>
                            <div className="dropdown-content">
                                <a href="/statistics">Общая статистика</a>
                                <a href="/category_statistics">По категориям</a>
                            </div>
                        </div>
                    </li>
                    {user
                        ? <div className='options'>
                            <li className="nav-item-user">
                                <a className="nav-link active" style={{color: '#14a60e'}}
                                   href=""><FaUserAlt className='user-icon'/> {user}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href='#'
                                >Выйти</a>
                            </li>
                        </div>
                        : <div className='options'>
                            <li className="nav-item">
                                <a className="nav-link active" href="">Регистрация</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="">Войти</a>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </nav>
    )
}