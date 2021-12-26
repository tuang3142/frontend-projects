import React from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import placeholder from './placeholder';
import './App.css';

const Toolbar = props => (
  <div className="toolbar">
    <i className="fa fa-free-code-camp" />
    {props.text}
    <i className={props.icon} onClick={props.onClick}/>
  </div>
);

marked.setOptions({
  breaks: true,
  highlight: code => {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const Preview = props => (
  <div id="preview"
    dangerouslySetInnerHTML={{
      __html: marked(props.markdown, { renderer: new marked.Renderer() })
    }}
  />
);

const Editor = props => (
  <textarea id="editor" onChange={props.onChange}
    type="text" value={props.markdown} />
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value });
  }

  handleEditorMaximize() {
    this.setState(state => ({
      editorMaximized: !state.editorMaximized }));
  }

  handlePreviewMaximize() {
    this.setState(state => ({
      previewMaximized: !state.previewMaximized }));
  }

  render() {
    const [editorClass, previewClass, icon] = this.state.editorMaximized
      ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
      : this.state.previewMaximized
        ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
        : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];

    return (
      <div>
        <div className={editorClass}>
          <Toolbar icon={icon} onClick={this.handleEditorMaximize} text="Editor"/>
          <Editor markdown={this.state.markdown} onChange={this.handleChange}/>
        </div>
        <div className={previewClass}>
          <Toolbar icon={icon} onClick={this.handlePreviewMaximize} text="Previewer"/>
          <Preview markdown={this.state.markdown} onChange={this.handleChange}/>
        </div>
      </div>
    );
  }
}

export default App;
