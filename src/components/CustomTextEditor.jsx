import React from "react";
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles, Button, Tooltip, Switch } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';

const customEditorClasses = {
  root: {
    padding:"15px 15px ",
    height:"calc(100vh - 32px)" //calc to account for padding
  },
  header: {
    display: "flex",
    height: "5vh",
    borderTopLeftRadius:"4px",
    borderTopRightRadius:"4px",
    marginBottom:"2px",
    backgroundColor: "#514254"
  },
  editorWrapper: {
    display:"flex",
    flexDirection: "column",
    height:"calc(95vh - 32px)",
    borderWidth:"thin",
    borderRadius:"4px",
    border: "3px solid #C0C0C0",
  },
  headerBtnRoot: {
    height: "100%",
    fontSize: "calc(12px + 1vw)"
  },
  btnLabel: {
    height: "-webkit-fill-available",
    fontSize: "calc(12px + 1vw)",
    color: "white"
  },
  editorBody:{
    overflow:"auto",
    height:"inherit",
    fontSize: "calc(6px + 1vw)",
    paddingLeft: "5px"
  },
  documentTitle: {
    marginLeft:"20px",
    marginRight:"20px",
    display:"flex",
    alignItems:"center",
    fontSize: "calc(6px + 1vw)",
    color:"white"
  },
  deletionSwitch: {
    marginLeft: "auto" 
  },
  toolbar: {
    border: "1px solid #5a5d5f"
  }
};

const toolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', "history", "list", "textAlign"],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
}

class CustomTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };


  onDelete = () => {
    if(this.props.file && this.props.deleteFile)
      this.props.deleteFile(this.props.file.id)
  }

  onSave(editorState){
    const newFileContent = JSON.stringify(editorState.getCurrentContent().getPlainText());
    if(this.props.file && this.props.saveFile){
      const { id, name } = this.props.file;
      this.props.saveFile({ id, name, content:newFileContent})
    }
  }

  componentDidUpdate( prevProps ){
    if(!this.props.file)
      return null;

    if(!prevProps.file || prevProps.file.id !== this.props.file.id)
      this.setState({ 
        editorState: EditorState.createWithContent(ContentState.createFromText(this.props.file.content))
      });
  }

  render() {
    const { editorState } = this.state;
    const { classes, file } = this.props;
    const toggleClientSideDeletionTooltip = 
      "toggles client-side deletion to simulate back-end deletion, still calls deletion API but triggers re-render of fileTree on file deletion";
    return (
      <div id="textEditorRoot" className={classes.root}>
        <div id="editorHeader" className={classes.header} >
          <Button onClick={() => this.onSave(editorState)} classes={{ root:classes.headerBtnRoot, label: classes.btnLabel }}>
            <Save/> 
          </Button>
          <Button onClick={() => this.onDelete(file.id)} classes={{ root:classes.headerBtnRoot, label: classes.btnLabel }}>
            <Delete/>
          </Button>
          {file && <span className={classes.documentTitle}>{file.name}</span>}
          <Tooltip title={toggleClientSideDeletionTooltip}>
            <Switch
              classes={{ root: classes.deletionSwitch }}
              checked={this.props.clientSideDeletion}
              onChange={() => this.props.toggleClientDeletion()}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
        </div>
        <div id="editorWrapper" >
          <Editor
            toolbarClassName={classes.toolbar}
            editorClassName={classes.editorBody}
            wrapperClassName={classes.editorWrapper}
            editorState={editorState}
            onEditorStateChange={(editorState) => {this.onEditorStateChange(editorState)}}
            toolbar={toolbar}
          />
        </div>
      </div>
    )
  }

}

export default withStyles(customEditorClasses)(CustomTextEditor);