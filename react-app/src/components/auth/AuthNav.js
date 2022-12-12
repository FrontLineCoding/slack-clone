import { useDispatch } from 'react-redux'
import logoutSVG from '../../svgFiles/logout.svg'
import { logout } from '../../store/session'
import './Auth.css'
import { useHistory } from 'react-router-dom'

const AuthNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }

    return (
        <div className="auth-nav">
            <img src={logoutSVG} onClick={handleLogout}/>
        </div>
    )
}


export default AuthNav;
