import React, {useEffect, useState} from 'react';
import {Route, useLocation, useNavigate} from 'react-router-dom';
import {FaSearch, FaUserAlt} from "react-icons/fa";


import CafeService from "./CafeService";
import {useAuth} from "../hook/useAuth";

const cafeService = new CafeService();

export default function Top() {

    const user = localStorage.getItem('user')
    const {signOut} = useAuth();
    const navigate = useNavigate();


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
                                <a className="nav-link active" href='#' onClick={() => signOut(() => navigate('/', {replace: true}))}
                                >Выйти</a>
                            </li>
                        </div>
                        : <div className='options'>
                            <li className="nav-item">
                                <a className="nav-link active" href="/registration">Регистрация</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/login">Войти</a>
                            </li>
                        </div>
                    }
                </ul>
            </div>
        </nav>
    )
}