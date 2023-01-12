import React, {useEffect, useState} from 'react';
import CafeService from './CafeService';
import {useLocation, useParams} from "react-router-dom";
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartArea
} from "@progress/kendo-react-charts";
import "hammerjs";

const cafeService = new CafeService();


export default function MealChart() {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const location = useLocation();
    const meal_name = location.state?.meal_name


    useEffect(() => {
        cafeService.getMealData(id).then(function (result) {
            console.log(result);
            setData(result);
        })
    }, [id]);

    const ChartContainer = () => (
        <Chart className='chart'>
            <ChartArea background="#eee" margin={30} width={1000} height={700}/>
            <ChartTitle text={meal_name} color="green" font="28pt Montserrat"/>
            <ChartValueAxis>
                <ChartValueAxisItem
                    title={{
                        text: "Число переходов",
                        color: "green",
                        font: "20pt Montserrat"
                    }}
                    labels={{
                        color: 'black',
                        padding: 3,
                    }}
                    majorGridLines={{color:'#388135'}}
                    line={{color:'black'}}
                    min={0}
                    // max={5}
                />
            </ChartValueAxis>
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    baseUnit="days"
                    maxDivisions={18}
                    labels={{
                        color: 'black',
                        rotation: "auto"
                    }}
                    line={{color:'black'}}
                />
            </ChartCategoryAxis>
            <ChartSeries>
                <ChartSeriesItem
                    data={data}
                    type="column"
                    field="click_count"
                    categoryField="date"
                    color="rgba(252, 218, 137, 0.87)"

                />
            </ChartSeries>
        </Chart>
    );

    return (
        <div className='meal-statistics'>
            {/*<h2>{meal_name}</h2>*/}
            <ChartContainer/>
        </div>
    );
}