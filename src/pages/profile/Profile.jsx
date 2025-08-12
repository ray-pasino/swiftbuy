import {React, useContext} from 'react'
import { Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import './Profile.css'
import Profilenavbar from '../../components/profilenavbar/Profilenavbar';
import { StoreContext } from "../../context/StoreContext";


const Profile = () => {
  const {setToken} = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("")
    setTimeout(() => {
        navigate('/');
      }, 0);
  }

  return (
    <>
    <div className="profile-nav">
    <Profilenavbar/>
    </div>

    <div className='profile'>
      <div className="header-nav">
        <Link to='/'>
            <FontAwesomeIcon icon={faAngleLeft} size='lg'/>
        </Link>
            <h2>Profile</h2>
      </div>

      <div className="profile-links">

  
            <Link to='/myorders'>
            <div className="info-link">
            <p>My Orders</p>
            <FontAwesomeIcon icon={faAngleRight}/>
            </div>
            </Link>

        <div className="divider">
        <Link>
        <div className="info-link">
            <p>Personal Information</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>

        <Link>
        <div className="info-link-2">
            <p>Add Phone Number</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>
        </div>


        <div className="divider">

        <Link>
        <div className="info-link">
            <p>Change Email</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>

        <Link>
        <div className="info-link-2">
            <p>Change Password</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>
        </div>


        <div className="divider">

        <Link>
        <div className="info-link">
            <p>Delete My Account</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>

        <Link>
        <div className="info-link-2" onClick={logout}>
            <p>Log Out</p>
            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
        </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
