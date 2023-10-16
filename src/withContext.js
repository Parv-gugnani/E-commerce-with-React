import React from "react";
import Context from "./Context";

const withContext = (wrappedComponent) => {
  const WithHOC = (props) => {
    return (
      <Context.Consumer>
        {(context) => <wrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return WithHOC;
};

export default withContext;
