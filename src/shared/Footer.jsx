import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = ({ dataLoaded }) => {

    const handleEmailClick = () => {
        const email = 'walterarnoldjanssencaballero@gmail.com';
        const subject = 'Your email subject';
        const body = 'Your email body';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
      };

    const handleLinkedIn = () => {
        const linkedinUrl = "https://linkedin.com/in/walter-caballero-1a3b38277";
        window.location.href = linkedinUrl;
    }
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
                            <a href="#" onClick={handleEmailClick} className="link text-light">Contact Me</a> &nbsp;
                        </li>
                    </ul>

                    <ul id="footer-icons-container" className="nav col-md-1 justify-content-around align-items-right list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="fa fa-linkedin-square footer-icons" href="https://linkedin.com/in/walter-caballero-1a3b38277" target="_blank"></a>
                        </li>
                        <li className="ms-3">
                            <a className="fa fa-github footer-icons" href="https://github.com/geniichi" target="_blank"></a>
                        </li>
                        <li className="ms-3">
                            <a className="fa fa-envelope footer-icons" href="#" onClick={handleEmailClick}></a>
                        </li>
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
