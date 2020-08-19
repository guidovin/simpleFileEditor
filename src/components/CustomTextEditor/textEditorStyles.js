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
  toolbar: {
    border: "1px solid #5a5d5f",
  },
  switchWrapper: {
    display:"flex",
    flexDirection:"column",
    justifyContent: "center",
    marginLeft: "auto",
  }
};
export default customEditorClasses;