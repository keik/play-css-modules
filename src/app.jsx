import prefixer from 'autoprefixer'
import postcss from 'postcss'
import psScope from 'postcss-modules-scope'
import psLocal from 'postcss-modules-local-by-default'
import psImports from 'postcss-modules-extract-imports'
import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/css'
import 'brace/theme/github'

export default class App extends React.Component {

  constructor(props) {
    super()
    this.handleChangeCssEditor = this.handleChangeCssEditor.bind(this)
    this.handleChangePlugins = this.handleChangePlugins.bind(this)
    this.psPlugins = { psScope, psLocal, psImports, prefixer }
    this.state = {
      result: '',
      cssString: props.initialCssString,
    }
  }

  componentDidMount() {
    this.cssProcessor = postcss(Object.keys(this.psPlugins).map(k => this.psPlugins[k]))
    this.processCss(this.cssEditor.props.value)
  }

  handleChangeCssEditor(cssString) {
    this.processCss(cssString)
  }

  processCss(cssString) {
    this.setState({ cssString })
    this.cssProcessor.process(cssString, {})
      .then((result) => {
        this.setState({ result: result.css })
      })
      .catch((err) => {
        console.error(err)
        this.setState({ result: err.toString() })
      })
  }

  handleChangePlugins(e) {
    const plugins = Array.from(e.target.form.elements)
            .filter(c => c.checked)
            .map(c => this.psPlugins[c.name])
    this.cssProcessor = postcss(plugins)
  }

  render() {
    return (
      <div>
        <div>
          <h1>Play CSS Modules</h1>
          <form onChange={this.handleChangePlugins}>
            <h2>plugins</h2>
            <ul>
              <li>
                <label htmlFor="scope">
                  <input id="scope" type="checkbox" name="psScope" />
                  postcss-modules-scope
                </label>
              </li>
              <li>
                <label htmlFor="local">
                  <input id="local" type="checkbox" name="psLocal" />
                  postcss-modules-local-by-default
                </label>
              </li>
              <li>
                <label htmlFor="imprt">
                  <input id="imprt" type="checkbox" name="psImports" />
                  postcss-modules-extract-imports
                </label>
              </li>
              <li>
                <label htmlFor="prfxr">
                  <input id="imprt" type="checkbox" name="prefixer" />
                  autoprefixer
                </label>
              </li>
            </ul>
          </form>
        </div>

        <AceEditor
          ref={c => (this.cssEditor = c)}
          mode="css"
          theme="github"
          onChange={this.handleChangeCssEditor}
          name="input"
          editorProps={{ $blockScrolling: true }}
          value={this.state.cssString}
        />

        <AceEditor
          mode="css"
          theme="github"
          onChange={this.onChange}
          name="result"
          editorProps={{ $blockScrolling: true }}
          value={this.state.result}
          readOnly
        />

        <footer>
          <a href="//github.com/keik/play-css-modules">GitHub</a>
        </footer>
      </div>
    )
  }
}

App.propTypes = {
  initialCssString: React.PropTypes.string.isRequired,
}

App.defaultProps = {
  initialCssString: `.container {
  display: flex;
  color: red;
}`,
}
