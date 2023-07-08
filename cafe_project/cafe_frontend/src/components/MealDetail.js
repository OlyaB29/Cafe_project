import React, {useEffect, useState, useMemo} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import CafeService from './CafeService';

const cafeService = new CafeService();

const costMeals = (n, price) => {
    return n * price
}

function MealDetail() {

    const user = localStorage.getItem('user');
    const [meal, setMeal] = useState({});
    const {id, meal_category} = useParams();
    const [access, setAccess] = useState(localStorage.getItem('accessToken'));
    const [num, setNum] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const {register, formState: {errors, isValid}, handleSubmit} = useForm({mode: "onBlur"});
    const navigate = useNavigate();
    const location = useLocation();

    const result = useMemo(() => costMeals(num, meal.price ? meal.price : 0), [num])
    // const result = costMeals(num, meal.price ? meal.price : 0)

    const modal = () => {
        setIsShowModal(!isShowModal);
    }

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

    const onSubmit = (data) => {
        const ordered_meal = {name: meal.name, price: meal.price, cafe_meal_id: meal.id};
        const order = {meal: ordered_meal, customer: data, num: num}
        cafeService.createOrder(order).then(r => {
            console.log(r);
            modal();
            alert('Заказ успешно размещен')
        }).catch((error) => {
            console.log(error.response.data);
        })
    }


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

                        <button className="btn btn-success" onClick={() => setNum(num + 1)}>+</button>
                        <button className="btn btn-success" onClick={() => num > 0 && setNum(num - 1)}>-</button>
                    </div>
                    {user &&
                        <div className="to_place_order">
                            <button className="btn btn-success" disabled={num === 0} onClick={() => modal()}>Оформить
                                заказ
                            </button>
                        </div>}
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
            {isShowModal &&
                <div className="modal d-block py-5">
                    <div className="modal-content rounded-3 shadow">
                        <div>
                            <p><b>Ваш заказ:</b><br/>блюдо - {meal.name}<br/>количество порций - {num}<br/>сумма - {num * meal.price} руб.</p>
                        </div>
                        <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <label>
                                    Имя получателя заказа (по желанию):
                                    <input className="form-control"
                                           {...register("name", {
                                               maxLength: {value: 50, message: "Максимум 50 символов"},
                                               pattern: {
                                                   value: /^[a-zа-яё\s]+$/iu,
                                                   message: "Поле может содержать только русские или латинские буквы"
                                               }
                                           })}
                                    />
                                    {errors?.name &&
                                        <div className="error">
                                            <p style={{marginBottom: 0}}>{errors.name.message}</p>
                                        </div>}
                                </label>
                                <label>
                                    Телефон:
                                    <input className="form-control"
                                           {...register("phone", {
                                               required: "Поле обязательно к заполнению",
                                               pattern: {
                                                   value: /(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d|[\-\s]\d\d[\-\s]\d\d\d|\d{5})/,
                                                   message: "Некорректное значение"
                                               }
                                           })}
                                    />
                                    {errors?.phone &&
                                        <div className="error">
                                            <p style={{marginBottom: 0}}>{errors.phone.message}</p>
                                        </div>}
                                </label>
                                <label>
                                    Адрес:
                                    <textarea className="form-control"
                                           {...register("address", {
                                               required: "Поле обязательно к заполнению"
                                           })}
                                    />
                                    {errors?.phone &&
                                        <div className="error">
                                            <p style={{marginBottom: 0}}>{errors.address.message}</p>
                                        </div>}
                                </label>
                            </div>
                            <div className="modal-footer flex-nowrap p-0">
                                <button type="submit" className="btn btn-lg col-5" disabled={!isValid}>
                                    <strong>Заказать</strong></button>
                                <button type="button" className="btn-2 btn-lg col-5" onClick={modal}>
                                    <strong>Отменить</strong></button>
                            </div>
                        </form>
                    </div>
                </div>}
        </div>
    );
}

export default MealDetail;
