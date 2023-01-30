import {useLocation, Navigate} from 'react-router-dom'

const RequireAuth = ({children}) => {
    const location = useLocation();
    // const {user} = useAuth();

    const user  = localStorage.getItem('user');
    if (!user) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;
}

export {RequireAuth}