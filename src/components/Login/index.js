import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-text" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={this.onChangePassword}
          className="input"
          value={password}
        />
      </>
    )
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="name" className="label-text">
          Username
        </label>
        <input
          type="text"
          value={username}
          id="name"
          placeholder="Username"
          onChange={this.onChangeUsername}
          className="input"
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state

    return (
      <>
        <div className="login-bg-container">
          <div className="image-bg-container">
            <img
              src="https://res.cloudinary.com/dwwtoll0q/image/upload/v1655963796/Layer_2_ako4nk.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="login-sub-container">
              <div className="logo-container">
                <img
                  src="https://res.cloudinary.com/dmu5r6mys/image/upload/v1645095409/Group_uiqlwh.png"
                  alt="website logo"
                  className="logo-image"
                />
                <h1 className="heading">Insta Share</h1>
              </div>
              <div className="inputs-bg-container">
                <div className="input-container">{this.renderUsername()}</div>
                <div className="input-container">{this.renderPassword()}</div>
                {showError && <p className="error-message">*{errorMsg}</p>}
                <button type="submit" className="submit-button">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Login
