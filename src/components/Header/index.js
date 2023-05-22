import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const onClickLogo = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <nav className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
        onClick={onClickLogo}
      />
      <ul className="list-container">
        <Link to="/">
          <li className="header-li-items">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="header-li-items">Jobs</li>
        </Link>
      </ul>
      <button className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
      <ul className="icon-container">
        <Link to="/">
          <li>
            <AiFillHome className="react-icons" />
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <BsFillBriefcaseFill className="react-icons" />
          </li>
        </Link>
        <li onClick={onClickLogout}>
          <FiLogOut className="react-icons" />
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
