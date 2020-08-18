import React from "react";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Folder, FolderOpen } from '@material-ui/icons';
import { withStyles, Collapse } from "@material-ui/core";
import { useSpring, animated } from 'react-spring/web.cjs'

const fileTreeClasses = {
  treeRoot: {
    height: "calc(100vh - 58px)",
    overflow: "auto",
    borderRadius: "4px",
    border: "2px solid black",
    padding: "16px 8px 8px 8px"
  },
  fileTreeWrapper: {
    flexGrow:6,
    padding: "15px 15px",
    overflow: "auto"
  },
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

class FileTreeView extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.files !== nextProps.files) {
      return true;
    }
    return false;
  }

  buildTreeBranch({id, name, isDirectory, children}){
    const openFileById = (fileId) => {
      if(this.props.setOpenId)
        this.props.setOpenId(fileId);
      else
        throw new Error("missing setOpenId prop at FileTreeView");
        //could be any kind of error handling, just an example in situations where the bug cause is catastrophic
        //and should crash the aplication. Usefull mostly for development/debuging purposes as crashing in use by clients is never a good thing
    }

    return(
      <TreeItem 
        nodeId={`${id}`} 
        label={name} 
        onClick={() => openFileById(id)} 
        key={(Math.random()*99999)%99999}  
      >
        {
          isDirectory && children && children.length > 0 &&
          children.map(child => this.buildTreeBranch(child))
        }
      </TreeItem>
    );

  }
  
  expandFirstNodes(){//tiny "cheat" to initialize the tree a little prettier
    return ["0","1","2","3","4","5","6","7","8","9","10","11","12","13"]
  }
  
  render(){
    const { files, classes } = this.props;
      return( 
        <div id="FileTreeViewWrapper" className={classes.fileTreeWrapper}>
          <TreeView
            defaultExpanded={this.expandFirstNodes()} 
            className={classes.treeRoot}
            defaultCollapseIcon={<FolderOpen/>}
            defaultExpandIcon={<Folder/>}
            TransitionComponent={TransitionComponent}
          >
            {files.map(fileData => this.buildTreeBranch(fileData))}
          </TreeView>
        </div>
      );
  }
}

export default withStyles(fileTreeClasses)(FileTreeView);