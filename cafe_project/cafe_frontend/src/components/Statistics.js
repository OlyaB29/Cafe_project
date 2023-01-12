import React, {useEffect, useState} from 'react';
import CafeService from './CafeService';

const cafeService = new CafeService();


export default function Statistics() {

    const [topMeals, setTopMeals] = useState([]);
    const [topUsers, setTopUsers] = useState([]);


    useEffect(() => {
        cafeService.getMealData().then(function (result) {
            console.log(result);
            setData(result);
        });

    }, []);


    return (
        <div className='statistics'>
            <div className='top-meals'>
                <h3>Топ 3 наших блюда</h3>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Название блюда</th>
                        <th>Количество переходов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topMeals.map((meal, index) =>
                        <tr>
                            <td className='ind'>{index + 1}</td>
                            <td className='value'>{meal.name}</td>
                            <td className='value' style={{textAlign: "center"}}>{meal.click_count}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className='top-users'>
                <h3>Топ 10 активных пользователей</h3>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Имя пользователя</th>
                        <th>Количество переходов</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topUsers.map((user, index) =>
                        <tr>
                            <td className='ind'>{index + 1}</td>
                            <td className='value'>{user.username}</td>
                            <td className='value' style={{textAlign: "center"}}>{user.user_click_count}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
);
}