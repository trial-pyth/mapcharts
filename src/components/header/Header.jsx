import "./header.css";
import {
  faMap,
  faLanguage,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from "../../context/useAuth";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();

  const signout = async (e) => {
    try {
      const response = await axios.get("/logout");
      console.log(response.data);
    } catch (error) {
      console.log(error?.message);
    }

    setAuth({});
    navigate("/");
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="title">
          <h2>
            <FontAwesomeIcon icon={faMap} style={{ marginRight: "0.3rem" }} />
            MapCharts
          </h2>
        </div>
        <div className="items">
          <div className="item">Hello {auth.user}!</div>
          <div className="item">
            <FontAwesomeIcon icon={faLanguage} />
          </div>
          <div className="item">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              onClick={signout}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
