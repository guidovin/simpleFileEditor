import axios from "axios";

// These functions are context dependant and not fully detached from the component in which they are used. 
// They are separated for readability and organiation. 
// A more robust implementation would not rely on the binding of the component context (bind(this)) and instead pass the state, 
// props, and setStates required as function params. 
// With that said, I believe this falls beyond the scope of this project as they will not be used anywhere else

// this function is unnecessary for the purpuses of this test, I'm leaving it here just as an example 
async function getSingleFile(){
  const openId = this.state.openId ? this.state.openId : 0;
  try {
    const response  = await axios({
      method:"get",
      url:`https://my-json-server.typicode.com/open-veezoo/editor/files/${openId}`,
      headers: {
          "Accept":"application/json",
        },
    })
    if(response.status === 200 && response.data && response.data.length > 0 && !this.state.fetchedFileTree)
      this.setState({ fetchedFile: response.data });
  }
  catch(error) {
    console.log(error)
  }
}

async function getFileTree() {
  try {
    const response  = await axios({
      method:"get",
      url:"https://my-json-server.typicode.com/open-veezoo/editor/filetree",
      headers:{
        "Accept":"application/json",
      },
    })
    if(response.status === 200 && response.data && response.data.length > 0 && !this.state.fetchedFileTree)
      this.setState({ fetchedFileTree: response.data });
  }
  catch(error){
    console.log(error)
  }
}

async function saveFile(file) {
  try {
    const response  = await axios({
      method:"put",
      url:`https://my-json-server.typicode.com/open-veezoo/editor/files/${file.id}`,
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      data: file
    });
    if(response.status === 200)
      window.alert("document saved successfully")
  }
  catch(error){
    console.log(error)
  }
}

async function deleteFile(fileId){
  try {
    const response = await axios({
      method:"delete",
      url:`https://my-json-server.typicode.com/open-veezoo/editor/files/${fileId}`,
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
    });
    console.log(response, "res delete")
    if(response.status === 200){
      if(this.state.clientSideDeletion)
        this.lazyDeleteFile(fileId);
      else 
        //this does not update the rendered files because the server discards changes, 
        //but if it did the function would fetch the updated files from the back and set them
        this.getFileTree();
    }
  }
  catch(error){
    console.log(error)
  }
}

export { getFileTree, saveFile, deleteFile, getSingleFile }