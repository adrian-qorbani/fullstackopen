import GithubIcon from "/gh.svg";

const Footer = () => {
  const marginTop = {
    marginTop: 31,
  };
  return (
    <div style={marginTop}>
      <i>
        Library Collection App, Mahdi GH. 2023 |
        <a href="https://github.com/adrian-qorbani/fullstackopen/tree/main/part8/graphql-library">
          {" "}
          Github Repo{" "}
          <img
            src={GithubIcon}
            alt="github repo link"
            style={{
              width: "22px",
              height: "22px",
              marginRight: "5px",
              verticalAlign: "middle",
            }}
          />
        </a>
      </i>
    </div>
  );
};

export default Footer;
