import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? 'activeLink' : '';
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-0 bg-info" id="navBar-main">
        <a className="navbar-brand d-flex align-items-center justify-content-center" href="/">Nobody</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <div className={`d-flex nav-item ${isActive('/')}`} >
                <Link to="/" className="link text-dark">About Me</Link> &nbsp;
            </div>
            <div className={`d-flex nav-item ${isActive('/projects')}`}>
                <Link to="/projects" className="link text-dark">Projects</Link> &nbsp;
            </div>
            <div className={`d-flex nav-item ${isActive('/contact')}`}>
                <Link to="/contact" className="link text-dark">Contact Me</Link> &nbsp;
            </div>
            <div className={`d-flex nav-item ${isActive('/books')}`}>
              <Link to="/books" className="link text-dark">Books</Link>
            </div>
          </div>
        </div>
        <Link to="/signupAsAdmin">
            <button className="btn btn-outline-light rounded-pill no-shadow no-outline">Sign in as Admin</button>
        </Link>
      </nav>
  )
}

export default Navbar
