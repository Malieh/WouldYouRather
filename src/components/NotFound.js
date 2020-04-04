import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <h3 className='center'>
          404, Sorry the route you are looking for is not avalaible. please go
          home
        </h3>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(NotFound);
