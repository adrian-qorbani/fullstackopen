import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCode,
  faPaintbrush,
} from "@fortawesome/free-solid-svg-icons";

const element = <FontAwesomeIcon icon={faPaintbrush} />;
const element1 = <FontAwesomeIcon icon={faCode} />;
const element2 = <FontAwesomeIcon icon={faGear} />;

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        Created and designed by <a href="">{element2} Adrian Ghorbani</a> 2023 |{" "}
        <a href=""> {element1} Source Code</a> |{" "}
        <a href="https://picocss.com/"> {element} Theme </a>
      </p>
    </footer>
  );
};

export default Footer;
