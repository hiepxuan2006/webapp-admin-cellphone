import { Route } from "react-router-dom";

const RouteDashboard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Component {...props} {...rest} />
        </>
      )}
    ></Route>
  );
};

export default RouteDashboard;
