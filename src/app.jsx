import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/theme/github'

export default class App extends React.Component {

  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    console.log(this)
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="java"
          theme="github"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    )
  }

}
