import React, { useEffect } from "react";
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withStyles, Button, Tooltip, Switch } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import customEditorClasses from "./textEditorStyles";


const toolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', "history", "list", "textAlign"],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
}

const onDelete = ({ file, deleteFile, setEditorState }) => {
  if(file && deleteFile){
    deleteFile(file.id)
    setEditorState(EditorState.createEmpty());
  }
}

function onSave({editorState,  file , saveFile }){
  const newFileContent = JSON.stringify(editorState.getCurrentContent().getPlainText());
  if(file && saveFile){
    const { id, name } = file;
    saveFile({ id, name, content:newFileContent})
  }
}

const toggleClientSideDeletionTooltip = 
  "toggles client-side deletion to simulate back-end deletion, still calls deletion API but triggers re-render of fileTree on file deletion. Default is ON";


function EditorHeader({ classes, file, toggleClientDeletion, clientSideDeletion, deleteFile, saveFile, editorState, setEditorState }){
  //more hooks examples
  const [ switchSize , setSwitchSize] = React.useState("medium");
  useEffect(() => {
    function handleResize() {
      if(window.innerHeight <= 650 && switchSize !== "small")
        setSwitchSize("small");
      if(window.innerHeight > 650 && switchSize !== "medium")
        setSwitchSize("medium");
    }
    window.addEventListener('resize', handleResize);
  });

  return(
    <div id="editorHeader" className={classes.header} >
        <Button onClick={() => onSave({ editorState,  file , saveFile })} classes={{ root:classes.headerBtnRoot, label: classes.btnLabel }}>
          <Save/> 
        </Button>
        <Button onClick={() => onDelete({ file, deleteFile, setEditorState })} classes={{ root:classes.headerBtnRoot, label: classes.btnLabel }}>
          <Delete/>
        </Button>
        {file && <span className={classes.documentTitle}>{file.name}</span>}
        <Tooltip title={toggleClientSideDeletionTooltip}>
          <div className={classes.switchWrapper}> 
            <Switch
              size={switchSize}
              checked={clientSideDeletion}
              onChange={() => toggleClientDeletion()}
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
        </Tooltip>
      </div>
  );
}

//implementation with functional components to showcase some hook usage
function CustomTextEditor(props) {
  const { classes, file } = props;
  const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());
  
  useEffect(() => {
    if(file && file.content)
      setEditorState(EditorState.createWithContent(ContentState.createFromText(file.content)));
  }, [file]);

  return (
    <div id="textEditorRoot" className={classes.root}>
      <EditorHeader editorState={editorState} setEditorState={setEditorState} {...props}/>
      <div id="editorWrapper" >
        <Editor
          toolbarClassName={classes.toolbar}
          editorClassName={classes.editorBody}
          wrapperClassName={classes.editorWrapper}
          editorState={editorState}
          onEditorStateChange={(editorState) => setEditorState(editorState)}
          toolbar={toolbar}
        />
      </div>
    </div>
  )
}

export default withStyles(customEditorClasses)(CustomTextEditor);