import React from 'react';
import FileTreeView from './components/FileTreeView';
import { fileTreeData, filesData } from "./mocks/dataMocks"
import CustomTextEditor from './components/CustomTextEditor';
import { withStyles } from '@material-ui/core';
const classes = {
  root: {
    display: "flex"
  },
  fileTreeWrapper: {
    width: "25vw"
  },
  textEditorWrapper: {
    flexGrow: 1
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openId: ""
    }
  }

  // the passing of a setter to a child node could be substituted by 
  // global state management such as redux or even the new React context API
  // in this instance and "project" scope, however, I believe it to be ill advised,
  // too much unnecessary clutter and added complexity. 
  setOpenId(newId){
    console.log("set open ID to newId ", newId)
    if(newId)
      this.setState({ openId: newId });
  }

  getFileById(){
    const file = filesData.filter( file => file.id == this.state.openId );
    console.log(filesData, file[0], this.state.openId  )
    if(file.length > 0)
      return file[0];
    else
      return null;
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div id="FileTreeViewWrapper" className={classes.fileTreeWrapper}>
          <FileTreeView setOpenId={this.setOpenId.bind(this)} files={fileTreeData}/>
        </div>
        <div id="editorWrapper" className={classes.textEditorWrapper}>
          {this.getFileById() && <CustomTextEditor file={this.getFileById()}/>}
        </div>
      </div>
    );
  }
}

export default withStyles(classes)(App);
