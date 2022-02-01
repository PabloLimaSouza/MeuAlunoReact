import jwt_decode from "jwt-decode";
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from '../../../contexts/StoreContext';

const RoutesPrivate = ({ component: Component, ...rest }) => {
  const { token, } = useContext(StoreContext);

  var decoded = jwt_decode(token);
  
  if (decoded.exp < (Date.now().valueOf() / 1000)) {
    return (
      <Route
        {...rest}
        render={() => <Redirect to="/login" />
        }
      />
    )
  } else {
      return (
        <Route
          {...rest}
          render={() => token
            ? <Component {...rest} />
            : <Redirect to="/login" />
        }
      />
    )
  }
}

export default RoutesPrivate;