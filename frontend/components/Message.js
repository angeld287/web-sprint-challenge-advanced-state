import React from 'react'
import { connect } from 'react-redux';

function Message(props) {
  return <div id="message">{props.infoMessage}</div>
}

export default connect(state => state)(Message);
