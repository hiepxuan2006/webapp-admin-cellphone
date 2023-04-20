import { Navigate } from "react-router-dom";
import WithAuthentication from "./WithAuthentication";

const RequireLogin = (props) => {
  return (
    <WithAuthentication>
      {({ isAuthenticated }) => {
        return isAuthenticated ? props.children : <Navigate to="/" />;
      }}
    </WithAuthentication>
  );
};

export default RequireLogin;
