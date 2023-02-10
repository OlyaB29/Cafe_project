import React, {useEffect, useState, useMemo} from 'react';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import CafeService from './CafeService';

const cafeService = new CafeService();

const costMeals = (n,price) => {
    return n*price
}

function MealDetail() {

    const [meal, setMeal] = useState({});
    const {id, meal_category} = useParams();
    const [access, setAccess] = useState(localStorage.getItem('accessToken'));
    const [num, setNum] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const result = useMemo(() => costMeals(num, meal.price ? meal.price : 0), [num])
    // const result = costMeals(num, meal.price ? meal.price : 0)

    useEffect(() => {
        cafeService.getMealInCategory(meal_category, id, access).then(function (result) {
            console.log(result);
            if (result) {
                if (result.access) {
                    localStorage.setItem('accessToken', result.access);
                    setAccess(result.access);
                    localStorage.setItem('refreshToken', result.refresh);
                } else {
                    setMeal(result);
                }
            } else {
                navigate('/login', {replace: true, state: {from: location}});
            }
        })
    }, [id, access]);


    return (
        <div className='meal-detail' key={meal.id}>
            <h2 className='meal-name'>{meal.name}</h2>
            <div className="row">
                <div className="col-md-6">
                    {meal.photos?.length > 1
                        ? <scroll-container>
                            {meal.photos.map((photo, index) =>
                                <scroll-img key={index}>
                                    <img src={photo.image}
                                         className="img-fluid rounded-start" alt="..."/>
                                </scroll-img>)}
                        </scroll-container>
                        : <scroll-img>
                            <img width={250} height={250}
                                 src={meal.photos?.length === 1 ? meal.photos[0].image : "/img/No_photo.png"}
                                 className="img-fluid rounded-start" alt="..."/>
                        </scroll-img>
                    }
                    <div className="cost-count d-flex" role="meal-cost">
                        <span>{result} руб.</span>
                        <span>{num} шт.</span>

                        <button className="btn btn-success" onClick={()=>setNum(num+1)}>+</button>
                        <button className="btn btn-success" onClick={()=>num>0 && setNum(num-1)}>-</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='description'>
                        <h2>{meal.price} р.</h2>
                        <p><i>Размер порции:</i> {meal.size} г</p>

                        <h5>Описание:</h5>
                        <p>{meal.description}</p>
                        <a className='stat-link' href={`/meal_statistics/${meal.id}`}>Статистика</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MealDetail;
