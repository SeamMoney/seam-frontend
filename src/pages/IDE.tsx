import { AptosAccount, AptosClient, TokenClient } from "aptos";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import ParserServer from '../sections/ide/ParserServer'
import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-monokai";
// import  mock_toml  from "../constants";
import AceEditor from "react-ace";
import { useClient } from "hooks/useAptos";
import {useWallet} from "@aptos-labs/wallet-adapter-react";
// const tokenClient = new TokenClient(useClient());
type File = {
    name: string;
    script: string;
    warnings?: string[];
    compiled?: string;
}

interface EditorProps {
    file: File;
    openFiles: File[];
    module: string;
    saveFile: (file:File) => void;
    selectFile: (file:File) => void;
    closeFile: (file:File) => void;
}


const mockScript = (aptIN:any,) => {
    const amnt = aptIN * 100_000_000;
    const market_id= '0x4d61696e204163636f756e74';
    const script = 
    `script { \n
        
        fun main(sender: &signer) {
            0xaa90e0d9d16b63ba4a289fb0dc8d1b454058b21c9b5c76864f825d5c1f32582e::momentum_safe::do_nothing();
            
        }   
    }`
    return script;
}
const mockFile = {
    name: "test.move",
    script: mockScript(1),
    warnings:[]

}
const mockFile2 = {
    name: "test2.move",
    script: mockScript(1),
    warnings:[]

}

const mockProject = {
    name: "test",
    files: [mockFile,mockFile2],
    // toml: mock_toml
}

const loadProjects = () => {
    if(localStorage.getItem('user_projs') === null){
        localStorage.setItem('user_projs', JSON.stringify([mockProject]))
        return [mockProject]
    }
    return JSON.parse(localStorage.getItem('user_projs') || '[]')
}

const ProjCollection = (projects:any,selectedProject:any, selectProject: (file:File) => void,
    openFile: (file:File) => void,
) => {
    

    return (
        <div className="flex flex-col">
                <p className="text-center text-lg pb-2">Projects</p>
            {projects.map((project:any) => (
                <div className="flex flex-row">
                    <button
                        className={`${
                            selectedProject.name === project.name ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"
                        } flex flex-row items-center justify-center h-10 px-5 border-b-2 border-transparent font-medium text-sm`}
                        onClick={() => selectProject(project)}
                    >
                        {project.name}
                    </button>
                </div>
            ))}
            <div >
                <p>Files</p>
                <div className="rounded-lg bg-white bg-opacity-20 p-3 m-2">
            {selectedProject.files.map((file:File) => (
                <div className="flex flex-row">
                    <button
                        className=""
                        onClick={() => openFile(file)}
                    >
                        {file.name}
                    </button>
                </div>
            ))}
            </div>
            </div>

        </div>
    );
};
                        

const FileTabs = (files:File[], selectedFile:File, selectFile: (file:File) => void, closeFile: (file:File) => void) => {
    return (
        <div className="flex flex-row">
            {files.map((file:File) => (
                <div className={`${
                    selectedFile.name === file.name

                        ? "bg-white bg-opacity-30 font-underlined text-white"
                        : "bg-gray-100 text-gray-600"
                } flex flex-row justify-between h-10 px-5 border-b-2 border-transparent font-medium text-sm`}>
                    <button
                        
                        onClick={() => selectFile(file)}
                    >
                        {file.name}
                    </button>
                    <button
                        className="flex items-top justify-end h-4 p-1 rounded-md hover:bg-white hover:text-red"
                        onClick={() => closeFile(file)}
                    >
                        <FaTimes size={12} />
                    </button>
                </div>
            ))}
        </div>
    );
};



const IDE = () => {

    const saveFile = (file:File) => {
        console.log(file)
        const user_projs = loadProjects()
        const new_projs = user_projs.map((proj:any) => {
            if(proj.name === file.name){
                return file
            } else {
                return proj
            }
        })
        localStorage.setItem('user_projs', JSON.stringify(new_projs))
    }
    const closeFile = (file: File) => {
        const updatedFiles = selectedProject.files.filter((f:File) => f.name !== file.name);
        setOpenFiles(updatedFiles as File[]);
        if (updatedFiles.length > 0) {
            setSelectedFile(updatedFiles[0]);
        }
    };

    


    const [user_projs,setProjs] = useState<any[]>(loadProjects());
    const [selectedProject, setSelectedProject] = useState<any>(user_projs[0]);
    const [selectedFile, setSelectedFile] = useState<File>(user_projs[0].files[0]);
    const [openFiles, setOpenFiles] = useState<File[]>(user_projs[0].files);


    const openFile = (file: File) => {
        if (!openFiles.includes(file)) {
            setOpenFiles([...openFiles, file]);
        }
        setSelectedFile(file);
    };

    return (
    <div className="w-full h-full items-center justify-between">
        
        <div className="flex flex-row items-start justify-between">
        {ProjCollection(user_projs, selectedProject, setSelectedProject, openFile)}
        <FileEditor file={selectedFile}
        openFiles={openFiles}

        
        
        saveFile={saveFile} module="temp"
        selectFile={setSelectedFile}
        closeFile={closeFile}
        
        />
    </div>
    </div>
    )
}

const FileEditor = ({
    file,
    openFiles,
    module,
    saveFile,
    selectFile,
    closeFile,
}:EditorProps) => {


    const [currentText, setCurrentText] = useState<string>(file.script);

    return (
        <div className="mockup-window w-3/4 border-pink rounded-xl mockup-window-outline border-4 shadow-xl  shadow-pink  min-h-1/2 pt-2 m-3">
{/* <ParserServer/> */}
{FileTabs(openFiles,file,selectFile,closeFile)}
<AceEditor
        mode="graphqlschema"
        
        theme="monokai"
        value={currentText}
        onChange={setCurrentText}
        name="query-editor"
        
        editorProps={{ $blockScrolling: true }}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }}
        width="100%"
        height="500px"
      />

            {/* <div> */}

      {/* </div> */}
      <button 
      className="seam-button flex flex-row items-center justify-center h-10 px-5 border-b-2 border-transparent font-medium text-sm"
      onClick={()=>saveFile({name:file.name, script:currentText})}> <FaSave/> Save</button>
        </div>
    )}

export default IDE;