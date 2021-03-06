import React from 'react';
import FileTreeView from './components/FileTreeView/FileTreeView';
import { fileTreeData, filesData } from "./mocks/dataMocks"
import CustomTextEditor from './components/CustomTextEditor/CustomTextEditor';
import { withStyles } from '@material-ui/core';
import { getFileTree, saveFile, deleteFile } from "./serverComunicationUtils";

const classes = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },

  fileViewerWrapper: {
    flexGrow:1,
    flexBasis:"75vw"
  }
}

//I chose to use classes / setState instead of functional components with hooks (useState, etc...). 
//The reason being that I wanted easier access to life cycle functions such as shouldComponentUpdate and componentDidUpdate / Mount,
//adding many data handling methods in functional components can get more desorganized/burocratic (creating unrelated functions and passing props around),
//and performance-wise there aren't any specific optmizations implemented for functional components yet (although the React team stated there would be in future releases).
//I made sure, however, to implement some examples of their usage (at textEditor component) and some of the more advanced features such as emulating life cycle functions with useEffect
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: "",
      clientSideDeletion:true
    }
    this.saveFile = saveFile.bind(this); 
    this.getFileTree = getFileTree.bind(this); 
    this.deleteFile = deleteFile.bind(this); 
  }


  setFileById(newId) {
    const files = filesData.filter( file => file.id === newId );
    if(files.length > 0 && this.state.openId !== newId)
      this.setState({ openFile: files[0], openId:newId});    
  }

  toggleClientSideDeletion(){
    this.setState({ clientSideDeletion: !this.state.clientSideDeletion});
  }

  componentDidMount() {
    if(!this.state.fetchedFileTree)
      this.getFileTree();
  }

  //these functions delete the file from the client-side file tree. 
  //they traverse the tree recursively, remove the deleted node and set the fileTree state
  lazyFindAndDelete(subTree, idToDelete) {
    let newTree = [];
    for(let branch of subTree) {
      const hasChildren = branch.isDirectory && branch.children && branch.children.length > 0;

      if(branch.id === idToDelete) { /** do not add child to be deleted: do nothing */ }
      else if (hasChildren) { //if hasChildren add branch to tree and recursively add its children
        newTree.push({ 
          ...branch, 
          children: this.lazyFindAndDelete(branch.children, idToDelete) 
        })
      }
      else newTree.push(branch) //if !hasChildren and is not to be deleted just add the branch to its parent.children
    }
    return newTree;
  }

  lazyDeleteFile = (id) => {
    const newFileTree = this.lazyFindAndDelete(this.state.fetchedFileTree, id);
    this.setState({ 
      fetchedFileTree: newFileTree, 
      openFile: { 
        id: "", 
        name: "", 
        content: "" 
      } 
    });
  }

  // the passing of a setter to a child node could be substituted by 
  // global state management such as redux or even the new React context API
  // in this instance and "project" scope however, I believe it to be ill advised,
  // too much unnecessary clutter and added complexity. 

  render() {
    const { classes } = this.props;
    const { openFile, fetchedFileTree, clientSideDeletion } = this.state;
    const files = fetchedFileTree ? fetchedFileTree : fileTreeData;
    return (
      <div id="root" className={classes.root}>
        <FileTreeView 
          setOpenId={(id) => this.setFileById(id)} 
          files={files}
        />
        <div id="fileViewerWrapper" className={classes.fileViewerWrapper}>
          <CustomTextEditor 
            file={openFile} 
            saveFile={this.saveFile} 
            deleteFile={this.deleteFile}
            toggleClientDeletion={this.toggleClientSideDeletion.bind(this)}
            clientSideDeletion={clientSideDeletion}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(classes)(App);
