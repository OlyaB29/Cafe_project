import {useLocation, useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import {BsPlusCircle, BsXOctagon} from "react-icons/bs";
import CafeService from "./CafeService";
import Popup from "reactjs-popup";

const cafeService = new CafeService();


export default function MealCreate() {
    const navigate = useNavigate();
    const location = useLocation();
    const [access, setAccess] = useState(localStorage.getItem('accessToken'));
    const {register, formState: {errors, isValid}, handleSubmit, reset, control, setValue} = useForm({mode: "onBlur"});
    const [mealCategories, setMealCategories] = useState([]);
    const [indexes, setIndexes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [photos, setPhotos] = useState([]);
    const selFile = useRef();
    const [refe, setRefe] = useState([]);
    let copy = Object.assign([], refe);
    const [output, SetOutput] = useState(<p>Добавлено 0 фото из 10</p>);
    const [isCreate, setIsCreate] = useState(false);
    const [data, setData] = useState({});

    const pop = useRef();


    useEffect(() => {
        cafeService.getMenu().then(function (result) {
            setMealCategories(result);
        });
    }, [access]);


    // const getValue = (value) => {
    //     console.log(options);
    //     console.log(value);
    //     if (value) {
    //         return options.filter(option => value.indexOf(option.value) >= 0)
    //     } else {
    //         return []
    //     }
    // }


    const selectFiles = () => {
        selFile.current.click();
    }

    const renderPhoto = (photos) => {
        copy.length = 0;
        console.log(copy);
        !photos.length && setRefe(copy);
        photos.map((photo) => {
            const reader = new FileReader();
            reader.onload = function () {
                copy.push(reader.result);
                setRefe(copy);
            };
            reader.readAsDataURL(photo);
        });

        SetOutput(<p>Добавлено {photos.length} фото из 10</p>)
    }

    const addPhoto = (event) => {
        const target = event.target;
        if (!FileReader) {
            alert('FileReader не поддерживается — облом');
            return;
        }
        if (!target.files.length) {
            alert('Ничего не загружено');
            return;
        }
        const files = Array.from(target.files || []).slice(0, (10 - photos.length));
        const allPhotos = photos.concat(files);
        setPhotos(allPhotos);
        renderPhoto(allPhotos);
    }

    const deletePhoto = (index) => {
        photos.splice(index, 1);
        setPhotos(photos);
        renderPhoto(photos);
    }

    const closeTooltip = () => pop.current.close();

    useEffect(() => {
        if (isCreate) {
            cafeService.createMeal(data, access).then(function (r) {
                if (r) {
                    if (r.access) {
                        console.log(r)
                        localStorage.setItem('accessToken', r.access);
                        setAccess(r.access);
                        localStorage.setItem('refreshToken', r.refresh);
                    } else {
                        {
                            photos.length
                                ? cafeService.getMeals().then(function (result) {
                                    const lastMeal = result.sort((a, b) => b.id > a.id ? 1 : -1)[0];
                                    const lastMealId = lastMeal.id;
                                    console.log(lastMealId);
                                    const formData = new FormData();
                                    formData.append('meal', lastMealId);
                                    photos.map((photo) => {
                                        formData.set('image', photo);
                                        cafeService.createPhoto(formData, access);
                                    });
                                }).then(r => pop.current.open())
                                : pop.current.open();
                        }
                        reset();
                    }
                } else {
                    navigate('/login', {replace: true, state: {from: location}});
                }
            });
        }
    }, [isCreate, access, data])

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        setIsCreate(true);
        setData(data);
    }

    return (
        <div className="add-meal">
            <div className="container mt-5" style={{width: 900}}>
                <h2>Добавление блюда</h2>
                <form className='photos' style={{marginTop: 30}} onClick={selectFiles}>
                    {indexes.map((index) =>
                        <div className="selected-photo" key={index}>
                            {refe[index]
                                ? <img src={refe[index]} alt=""/>
                                : <img src="/img/No_photo.png" alt=""/>}
                            <BsXOctagon className="delete-photo" onClick={(event) => {
                                event.stopPropagation();
                                deletePhoto(index)
                            }}/>
                        </div>
                    )}
                    <input className="hidden" type="file" ref={selFile} multiple onChange={addPhoto}
                           accept="image/*,.png,.jpg,.gif"/>
                    {output}
                </form>

                <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 20}}>
                    <label style={{width: 870}}>
                        Наименование:
                        <input className="form-control" style={{marginTop: 10}}
                               {...register("name", {
                                   required: "Поле обязательно к заполнению",
                                   maxLength: {value: 100, message: "Максимум 100 символов"}
                               })}
                        />
                        {errors?.title &&
                            <div className="error">
                                <p>{errors.title.message}</p>
                            </div>}
                    </label>
                    <div className="row">
                        <div className="form-group col-md-5">
                            <label style={{width: 320, marginTop: 15}}>
                                Категория:
                                <Controller
                                    control={control}
                                    name="meal_type"
                                    rules={{required: "Необходимо выбрать категорию"}}
                                    render={({field: {onChange, value}, fieldState: {error}}) => (
                                        <div>
                                            <select className="custom-select" value={value} onChange={(newValue) => {
                                                onChange(newValue.target.value);
                                            }} placeholder="Выберите...">
                                                <option>Выберите...</option>
                                                {mealCategories.map((category, index) =>
                                                    <option key={index} value={category[0]}
                                                            label={category[0]}>{category[0]}</option>
                                                )}
                                            </select>
                                            {error &&
                                                <div className="error">
                                                    <p>{error.message}</p>
                                                </div>}
                                        </div>
                                    )}
                                />
                            </label>
                        </div>
                        <div className="form-group col-md-3">
                            <label style={{width: 235, marginTop: 15}}>Граммовка:
                                <input className="form-control" type="number"
                                       {...register("size", {required: "Поле обязательно к заполнению"})}
                                       style={{marginTop: 10}}/>
                            </label>
                            {errors?.size &&
                                <div className="error">
                                    <p>{errors.size.message}</p>
                                </div>}
                        </div>
                        <div className="form-group col-md-4" style={{paddingLeft: 50}}>
                            <label style={{width: 235, marginTop: 15}}>Стоимость в рублях:
                                <input className="form-control" type="number"
                                       {...register("price", {required: "Поле обязательно к заполнению"})}
                                       style={{marginTop: 10}}/>
                            </label>
                            {errors?.price &&
                                <div className="error">
                                    <p>{errors.price.message}</p>
                                </div>}
                        </div>
                    </div>
                    <label style={{width: 870, marginBottom: 20}}>
                        Описание:
                        <textarea className="form-control" style={{marginTop: 10, marginBottom: 10, height: 150}}
                                  {...register("description", {
                                      required: "Поле обязательно к заполнению",
                                      maxLength: {value: 4000, message: "Максимум 4000 символов"},
                                      minLength: {value: 20, message: "Минимум 20 символов"}
                                  })}/>
                        {errors?.description &&
                            <div className="error">
                                <p>{errors.description.message}</p>
                            </div>}
                    </label>

                    <button className="w-50 btn" type='submit' disabled={!isValid}>Добавить блюдо</button>
                </form>
            </div>

            <Popup className="my-popup" ref={pop} closeOnDocumentClick onClose={closeTooltip}>
                <div className="alert">
                    <span>Блюдо добавлено в меню</span><br/>
                </div>
            </Popup>
        </div>
    )
}


