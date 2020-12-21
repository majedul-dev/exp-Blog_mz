import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, userInfo } = useSelector((state) => state.userLogin);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          !userInfo && !loading ? (
            <Redirect to='/login' />
          ) : (
            <Component {...props} />
          )
        }
      />
    </>
  );
};

export default PrivateRoute;
