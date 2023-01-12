import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Menu from "./components/Menu";
import Top from "./components/Top";
import Category from "./components/Category";
import MealDetail from "./components/MealDetail";
import Statistics from "./components/Statistics";
import CategoryStatistics from "./components/CategoryStatistics";
import MealChart from "./components/MealChart";



function BaseLayout() {

    return (
        <div className="wrapper">
            <Top/>
            {/*<header>*/}
            {/*    <div className='presentation'></div>*/}
            {/*</header>*/}
            <div className="content">
                <Routes>
                    <Route path='/' element={<Menu/>}/>
                    <Route path='/meals/:meal_category' element={<Category/>}/>
                    <Route path='/meals/:meal_category/:id' element={<MealDetail/>}/>
                    <Route path='/statistics' element={<Statistics/>}/>
                    <Route path='/category_statistics' element={<CategoryStatistics/>}/>
                    <Route path='/meal_statistics/:id' element={<MealChart/>}/>
                    {/*<Route path='/adverts/seller/:id' element={<SellerAdverts/>}/>*/}
                    {/*<Route path='category/:slug' element={<CategoryAdvertList/>}/>*/}
                    {/*<Route path='search' element={<SearchAdverts/>}/>*/}
                    {/*<Route path='registration' element={<Registration/>}/>*/}
                    {/*<Route path='tokens' element={<Tokens/>}/>*/}
                    {/*<Route path='advert-create' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <AdvertCreateUpdate/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='advert-update/:id' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <AdvertCreateUpdate/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='login' element={<LoginPage/>}/>*/}
                    {/*<Route path='profile-update/:id' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <ProfileUpdate/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='profile/:id' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <UserProfile/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='profile/adverts' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <UserAdverts/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='messages' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <Messages/>*/}
                    {/*    </RequireAuth>}/>*/}
                    {/*<Route path='/mess-to-seller/:id' element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <MessToSeller/>*/}
                    {/*    </RequireAuth>}/>*/}
                </Routes>
            </div>
            <footer>
                Все права защищены &copy;
            </footer>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <BaseLayout/>
        </BrowserRouter>
    );
}

export default App;