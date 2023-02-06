import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {GiHamburgerMenu} from 'react-icons/gi'
import {HiOutlineLogout} from 'react-icons/hi'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {FiSun} from 'react-icons/fi'
import {RiMoonFill} from 'react-icons/ri'

import ContextForTheme from '../../context/ContextForTheme'

import './index.css'

class Header extends Component {
  state = {isShowHamburgerMenu: false, isShowSearch: false}

  onClickSearchTab = () => {
    this.setState(preState => ({isShowSearch: !preState.isShowSearch}))
  }

  onClickCloseButton = () => {
    this.setState({isShowHamburgerMenu: false})
  }

  onClickSearchButton = () => {
    const {onClickSearch} = this.props
    onClickSearch()
  }

  onClickHamBergerMenu = () => {
    this.setState(preState => ({
      isShowHamburgerMenu: !preState.isShowMobileMenu,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeInputSearch = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onKeyChangeEnter = event => {
    const {onEnterSearchInput} = this.props
    if (event.key === 'Enter') {
      onEnterSearchInput()
    }
  }
  renderSearchInput = () => {
    const {searchInput} = this.props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          value={searchInput}
          placeholder="Search Caption"
          onChange={this.onChangeInputSearch}
          onKeyDown={this.onKeyChangeEnter}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onClickSearchButton}
        >
          <FaSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {isShowHamburgerMenu, isShowSearch} = this.state
    const {searchInput} = this.props
    return (
      <ContextForTheme.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value

          const onClickToggle = () => {
            toggleTheme()
          }

          const bgColorClassName = isDarkTheme
            ? 'nav-bar-bg-dark'
            : 'nav-bar-bg-light'
          const navItemClassName = isDarkTheme
            ? 'list-text-dark-theme'
            : 'list-text-light-theme'

          const ThemeIcons = isDarkTheme ? (
            <FiSun size={15} color="#ffffff" />
          ) : (
            <RiMoonFill size={15} />
          )

          return (
            <nav className={`navbar ${bgColorClassName}`}>
              <div className="navbar-container">
                <div className="nav-bar-mobile-logo-container">
                  <Link to="/" className="nav-link">
                    <div className="logo-container">
                      <img
                        className="website-logo"
                        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1648981581/Group_qtyxfl.png"
                        alt="website logo"
                      />
                      <h1 className={`nav-menu-item ${navItemClassName}`}>
                        Insta Share
                      </h1>
                    </div>
                  </Link>
                  <div className="theme-icon-and-menu-container">
                    <div className="nav-menu-item">
                      <button
                        type="button"
                        className="theme-button"
                        onClick={onClickToggle}
                      >
                        {ThemeIcons}
                      </button>
                    </div>

                    <button
                      type="button"
                      className={`nav-mobile-button ${navItemClassName}`}
                      onClick={this.onClickHamBergerMenu}
                    >
                      <GiHamburgerMenu size={15} />
                    </button>
                  </div>
                </div>
                {isShowHamburgerMenu && (
                  <div className="menu-mobile-container">
                    <ul className="mobile-menu-nav-item-container">
                      <li className="nav-menu-item">
                        <button
                          type="button"
                          className="mobile-menu-btn"
                          onClick={this.onClickSearchTab}
                        >
                          <FaSearch className="search-icon-mobile" />
                        </button>
                      </li>
                      <li className="nav-menu-item">
                        <Link to="/" className="nav-link">
                          <p className="mobile-menu-item"> Home</p>
                        </Link>
                      </li>
                      <li className="nav-menu-item">
                        <Link to="/my-profile" className="nav-link">
                          <p className="mobile-menu-item">Profile</p>
                        </Link>
                      </li>
                      <li className="nav-item-mobile">
                        <button
                          type="button"
                          className="mobile-menu-button"
                          onClick={this.onClickLogout}
                        >
                          <HiOutlineLogout />
                        </button>
                      </li>
                      <li className="nav-item-mobile">
                        <button
                          type="button"
                          className="mobile-menu-button"
                          onClick={this.onClickCloseButton}
                        >
                          <AiOutlineClose />
                        </button>
                      </li>
                    </ul>
                    <div className="nav-item-mobile">
                      {isShowSearch && (
                        <div className="search-input-container">
                          <input
                            type="search"
                            className="search-input"
                            value={searchInput}
                            placeholder="Search Caption"
                            onChange={this.onChangeInputSearch}
                            onKeyDown={this.onKeyChangeEnter}
                          />
                          <button
                            type="button"
                            className="search-button"
                            onClick={this.onClickSearchButton}
                          >
                            <FaSearch className="search-icon" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="navbar-large-container">
                  <Link to="/" className="nav-link">
                    <div className="logo-container">
                      <img
                        className="website-logo"
                        src="https://res.cloudinary.com/dahw90b2z/image/upload/v1648981581/Group_qtyxfl.png"
                        alt="website logo"
                      />
                      <h1 className={`nav-menu-item ${navItemClassName}`}>
                        Insta Share
                      </h1>
                    </div>
                  </Link>
                  <ul className="nav-menu">
                    <li className="nav-menu-item">
                      {this.renderSearchInput()}
                    </li>
                    <li className="nav-menu-item">
                      <button
                        type="button"
                        className="theme-button"
                        onClick={onClickToggle}
                      >
                        {' '}
                        {ThemeIcons}
                      </button>
                    </li>
                    <li className="nav-menu-item">
                      <Link to="/" className="nav-link">
                        <p className={`${navItemClassName}`}>Home</p>
                      </Link>
                    </li>

                    <li className="nav-menu-item">
                      <Link to="/my-profile" className="nav-link">
                        <p className={`${navItemClassName}`}>Profile</p>
                      </Link>
                    </li>
                  </ul>
                  <div>
                    <button
                      type="button"
                      className="logout-desktop-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          )
        }}
      </ContextForTheme.Consumer>
    )
  }
}

export default withRouter(Header)
