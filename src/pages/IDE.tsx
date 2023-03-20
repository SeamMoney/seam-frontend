import { AptosClient } from "aptos";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import ParserServer from '../sections/ide/ParserServer'
import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-monokai";
import { mock_toml } from "../constants";
import AceEditor from "react-ace";
type File = {
    name: string;
    script: string;
    warnings?: string[];
    compiled?: string;
}

interface EditorProps {
    file: File;
    module: string;
    saveFile: (file:File) => void;
}


const mockScript = (aptIN:any,) => {
    const amnt = aptIN * 100_000_000;
    const market_id= '0x4d61696e204163636f756e74';
    const script = 
    `script { \n
        use 0x9770fa9c725cbd97eb50b2be5f7416efdfd1f1554beb0750d4dae4c64e860da3::controller;
        fun main(sender: &signer) {
            controller::register_user();
            controller::deposit("${market_id}", "${amnt}", false);
        }   
    }`
    return script;
}
const mockFile = {
    name: "test.move",
    script: mockScript(1),
    warnings:[]

}

const mockProject = {
    name: "test",
    files: [mockFile],
    toml: mock_toml
}

const loadProjects = () => {
    if(localStorage.getItem('user_projs') === null){
        localStorage.setItem('user_projs', JSON.stringify([mockFile]))
    }
    return JSON.parse(localStorage.getItem('user_projs') || '[]')
}

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

    const user_projs = loadProjects()

    return (
    <div className="w-full h-full items-center ">
        <p>IDE</p>
        <FileEditor file={mockFile} saveFile={()=>saveFile}module="temp"/>
    </div>
    )
}

// const ParserServer = (moveText:string) => {}



const FileEditor = ({
    file,
    module,
    saveFile
}:EditorProps) => {


    const [currentText, setCurrentText] = useState<string>(file.script);

    return (
        <div className="mockup-window w-3/4 border-pink rounded-xl mockup-window-outline border-4 shadow-xl  shadow-pink  min-h-1/2 pt-2 m-3">
{/* <ParserServer/> */}
<AceEditor
        mode="graphqlschema"
        
        theme="monokai"
        value={currentText}
        onChange={setCurrentText}
        name="query-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="200px"
      />

            <div>

      </div>
      <button onClick={()=>saveFile({name:file.name, script:currentText})}> <FaSave/> Save</button>

            </div>
    )}

export default IDE;