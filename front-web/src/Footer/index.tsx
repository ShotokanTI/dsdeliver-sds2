import './styles.css';
import { ReactComponent as YoutubeIcon } from './Youtube.svg';
import { ReactComponent as LinkedinIcon } from './Linkedin.svg';
import { ReactComponent as InstagramIcon } from './Instagram.svg';
function Footer() {
    return (
        <footer className="main-footer">
            App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
            <div className="footer-icons">
                <a target="_new" href="https://www.youtube.com/c/DevSuperior">
                    <YoutubeIcon />
                </a>
                <a target="_new" href="https://www.linkedin.com/school/devsuperior">
                    <LinkedinIcon/>
                </a>
                <a target="_new" href="https://www.instagram.com/devsuperior.ig">
                    <InstagramIcon/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;