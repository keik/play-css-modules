import React from 'react'

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },
  left: {
  },
  right: {
  },
  splitter: {
    left: '50%',
    background: 'grey',
    width: 4,
  },
}

export default class Splitter extends React.Component {

  constructor(props) {
    super()
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          {this.props.children[0]}
        </div>
        <div
          style={styles.splitter}
        />
        <div style={styles.right}>
          {this.props.children[1]}
        </div>
      </div>
    )
  }
}

Splitter.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
}
