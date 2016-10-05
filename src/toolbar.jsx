import React from 'react'

const styles = {
  ul: {
    listStyle: 'none',
    padding: 0,
  },
}

export default class Toolbar extends React.Component {

  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <h1>Play CSS Modules</h1>
        <form onChange={this.props.onChangePlugins}>
          <h2>plugins</h2>
          <ul style={styles.ul}>
            <li>
              <label htmlFor="local">
                <input id="local" type="checkbox" name="psLocal" />
                postcss-modules-local-by-default
              </label>
            </li>
            <li>
              <label htmlFor="imports">
                <input id="imports" type="checkbox" name="psImports" />
                postcss-modules-extract-imports
              </label>
            </li>
            <li>
              <label htmlFor="prefixer">
                <input id="prefixer" type="checkbox" name="prefixer" />
                autoprefixer
              </label>
            </li>
            <li>
              <label htmlFor="scope">
                <input id="scope" type="checkbox" name="psScope" />
                postcss-modules-scope
              </label>
            </li>
            <li>
              <label htmlFor="parser">
                <input id="parser" type="checkbox" name="psParser" />
                postcss-modules-parser
              </label>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

Toolbar.propTypes = {
  onChangePlugins: React.PropTypes.func.isRequired,
}
