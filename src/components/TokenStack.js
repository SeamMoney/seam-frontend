import { viewAddressLink } from "../hooks/useExplorer";
import Token from "./Token";

export default function TokenStack(tokens,onClick) {
    return (<div className="">
        <div className={`py-2 px-3 flex flex-row items-center -space-x-6 gap gap-1 avatar-group`}>
            {tokens.tokens.map((token,i) => {return(
                    // <a href={viewAddressLink(token)}>
                    <button onClick={()=>onClick(token)} key={`${token}-select`}>
                    <Token key={i} i={i} token={token} />
                    </button>
                    // </a>
                
            )})}
        </div>
    </div>
    );
}