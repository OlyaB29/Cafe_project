import React, {useEffect, useState, useMemo} from 'react';
import CafeService from './CafeService';
import {useLocation, useParams} from "react-router-dom";
// import {FaSearch} from "react-icons/fa";

const cafeService = new CafeService();

const numberViews = (n) => {
    alert('ok')
    return n-1
}

export default function Category() {

    const {meal_category} = useParams();
    const {state} = useLocation();
    const [meals, setMeals] = useState([]);
    const [allMeals, setAllMeals] = useState([]);
    const [num, setNum] = useState(1);

    const result = useMemo(() => numberViews(num), [num]);

    useEffect(() => {
        cafeService.getMealCategory(meal_category).then(function (result) {
            console.log(result);
            setAllMeals(result);
            setMeals(result);
            console.log(result)
        })
    }, [meal_category]);


    const seachMeals = (e) => {
        const query = e.target.value;
        const seachedMeals=allMeals.filter(meal => meal.name.toLowerCase().includes(query) || meal.description.toLowerCase().includes(query));
        setMeals(seachedMeals)
    }

    const sortUpPrice = () => {
        const sortedMeals=meals.sort((a, b) => b.price < a.price ? 1 : -1)
        setNum(num+1)
        setMeals(sortedMeals)
    }

    const sortDownPrice = () => {
        const sortedMeals=meals.sort((a, b) => b.price > a.price ? 1 : -1)
        setNum(num+1)
        setMeals(sortedMeals)
    }

    const sortAlpha = () => {
        const sortedMeals=meals.sort((a, b) => b.name.slice(0,3) < a.name.slice(0,3) ? 1 : -1)
        setNum(num+1)
        setMeals(sortedMeals)
    }

    return (
        <div className='meals'>
            <h2>{state}</h2>
            <div className="sort-options">
                <div className="row">
                    <div className="col-md-8">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 col-md-12" type="search" name="search"
                                   placeholder="Поиск"
                                   aria-label="Search" onChange={seachMeals}/>
                            {/*<button className="btn btn-success" type="submit"><FaSearch/></button>*/}
                        </form>
                    </div>
                    <div className="col-md-4">
                        <div className="dropdown">
                            <a className="nav-link active" aria-current="page" href="#">Сортировать</a>
                            <div className="dropdown-content">
                                <a href="#" onClick={sortUpPrice}>По возрастанию цены</a>
                                <a href="#" onClick={sortDownPrice}>По убыванию цены</a>
                                <a href="#" onClick={sortAlpha}>По алфавиту</a>
                            </div>
                        </div>
                        <h7>просмотрено {result} вариантов</h7>
                    </div>
                </div>
            </div>
            {meals.map((meal) =>
                <a className='meal-link' key={meal.id} href={`/${meal_category}/${meal.id}`}>
                    <div className="meal-photo">
                        <img src={meal.photos.length ? meal.photos[0].image : "/img/No_photo.png"} alt=""/>
                        <p>{meal.name}</p>
                    </div>
                </a>)
            }
        </div>
    );
}