import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ({ dataLoaded }) => {
  return (
    <>
        {dataLoaded ? (
            <div id="footer-main">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mb-1 mt-4 border-top">
                    <ul className="nav col-md-4 justify-content-around align-items-left list-unstyled d-flex">
                        <li className="ms-3">
                            <Link to="/" className="link text-light">About Me</Link> &nbsp;
                        </li>
                        <li className="ms-3">
                            <Link to="/projects" className="link text-light">Projects</Link> &nbsp;
                        </li>
                        <li className="ms-3">
                            <Link to="/contact" className="link text-light">Contact Me</Link> &nbsp;
                        </li>
                        <li className="ms-3">
                            <Link to="/books" className="link text-light">Admin</Link>
                        </li>
                    </ul>

                    <ul id="footer-icons-container" className="nav col-md-1 justify-content-around align-items-right list-unstyled d-flex">
                        <li className="ms-3"><a className="fa fa-linkedin-square footer-icons" href="#"></a></li>
                        <li className="ms-3"><a className="fa fa-github footer-icons" href="#"></a></li>
                        <li className="ms-3"><a className="fa fa-envelope footer-icons" href="#"></a></li>
                    </ul>
                </footer>
            </div>
        ) : (
            <></>
        )}
    </>

  )
}

export default Footer
