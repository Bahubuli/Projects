//styles and images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg';
import Avatar from './Avatar';
import {NavLink} from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

export default function Sidebar() {

    const {user} = useAuthContext();

  return (
    <div className = "sidebar">
        <div className = "sidebar-content">
            <div className = "user">
                {/* avatar and username here */}
                <Avatar src = {user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>

            <div className = "links">
                <ul>
                    <li>
                        <NavLink exact to= "/">
                            <img src = {DashboardIcon} alt = "dashboard icon"/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to= "/create">
                            <img src = {AddIcon} alt = "Add icon"/>
                            <span>New Project</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    </div>
  )
}
// we get error on logout
// because null.photoURL in invalid
// so we hide/disable sidebar component
// on logout
