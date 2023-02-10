import { useState } from "react";

const tabs = [
  { name: "Transactions", id: "txs" },
  { name: "Types", id: "types" },
  { name: "Resources", id: "resources" },
];

function SwitchView(props: any) {
  
  const [view, setView] = useState(props.tab_names[0]);
  return (
    <div className="flex flex-col  m-4 p-4 text-bold items-center justify-center">
      <div className="flex flex-row gap-2 items-center justify-center">
        {props.tab_names.map((tab:string, index:number) => {
          return (
            <a
              key={index.toString()}
              onClick={() => setView(tab)}
            >
              <p className={`tab text-3xl ${
                view === tab ? " underline" : ""
              }`}>{tab}</p>
            </a>
          );
        })}
      </div>
      {view === props.tab_names[0] && props.children[0]}
      {view === props.tab_names[1] && props.children[1]}
      {view === props.tab_names[2] && props.children[2]}
    </div>
  );
}

export default SwitchView;
