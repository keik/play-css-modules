import prefixer from 'autoprefixer'
import postcss from 'postcss'
import psScope from 'postcss-modules-scope'
import psLocal from 'postcss-modules-local-by-default'
import psImports from 'postcss-modules-extract-imports'
import psParser from 'postcss-modules-parser'
import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/css'
import 'brace/theme/github'

import Toolbar from './toolbar'
import Splitter from './splitter'

export default class App extends React.Component {

  constructor(props) {
    super()
    this.onChangeCssEditor = this.onChangeCssEditor.bind(this)
    this.onChangePlugins = this.onChangePlugins.bind(this)
    this.psPlugins = { psLocal, psImports, psScope, prefixer, psParser }
    this.state = {
      result: '',
      cssString: props.initialCssString,
    }
  }

  componentDidMount() {
    this.cssProcessor = postcss([])
    this.processCss(this.cssEditor.props.value)
  }

  onChangeCssEditor(cssString) {
    this.processCss(cssString)
  }

  onChangePlugins(e) {
    const plugins = Array.from(e.target.form.elements)
            .filter(c => c.checked)
            .map(c => this.psPlugins[c.name])
    this.cssProcessor = postcss(plugins)
    this.processCss(this.cssEditor.props.value)
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

  render() {
    return (
      <div>
        <Toolbar
          onChangePlugins={this.onChangePlugins}
        />

        <Splitter>
          <AceEditor
            editorProps={{ $blockScrolling: true }}
            mode="css"
            name="input"
            onChange={this.onChangeCssEditor}
            ref={c => (this.cssEditor = c)}
            tabSize={2}
            theme="github"
            value={this.state.cssString}
          />
          <AceEditor
            editorProps={{ $blockScrolling: true }}
            mode="css"
            name="result"
            onChange={this.onChange}
            readOnly
            style={{ backgroundColor: '#eaeaea' }}
            theme="github"
            value={this.state.result}
          />
        </Splitter>
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
