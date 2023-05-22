import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: '',
    errorMsg: '',
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, loginSuccess: false})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const loginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      const errorMsg = data.error_msg
      this.onSubmitFailure(errorMsg)
    }
  }

  render() {
    const {loginSuccess, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-bg-container">
        <form onSubmit={this.onSubmitLoginForm} className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="login-form-input" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input-element"
            value={username}
            onChange={this.changeUsername}
            type="text"
            placeholder="Username"
            id="username"
          />
          <label className="login-form-input" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="input-element"
            value={password}
            onChange={this.changePassword}
            type="password"
            placeholder="password"
            id="password"
          />
          <button className="login-form-button" type="submit">
            Login
          </button>
          {loginSuccess === false && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
