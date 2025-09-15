import { useParams } from "react-router-dom";
import AppTopBar from "../../components/top-bar/top-bar-component";
import "../page-styles.css";

const NotFound = () => {
  const params = useParams();
  const path = params["*"];

  return (
    <div className="outer-page-container">
      <AppTopBar />
      <div className="inner-page-container">
        Page for /{path} not Found, this has not been developt as part of this
        project task
      </div>
    </div>
  );
};

export default NotFound;
