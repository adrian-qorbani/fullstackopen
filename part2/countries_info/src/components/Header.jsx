import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const element0 = <FontAwesomeIcon icon={faGlobe} />;
const Header = () => {
  return (
    <hgroup>
      <h1>{element0} Rest Countries</h1>
      <h3>Countries Information Website</h3>
    </hgroup>
  );
};

export default Header;
