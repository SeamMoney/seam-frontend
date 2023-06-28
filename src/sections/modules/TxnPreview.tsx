import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  AptosAccount,
  AptosClient,
  BCS,
  HexString,
  TxnBuilderTypes,
} from "aptos";
import { Types } from "aptos";
import ModuleOutline from "components/etc/ModuleOutline";
import { formatParam, shortenAddress } from "hooks/formatting";
import { sendTransaction,previewTransaction } from "hooks/useAptos";
import { useState } from "react";

interface TxnPreviewProps {
  address: string;
  module: Types.MoveModuleBytecode;
  func: Types.MoveFunction;
  params: any[];
  generic_types: any[];
  client: AptosClient;
}

const {
  AccountAddress,
  TypeTagStruct,
  EntryFunction,
  StructTag,
  TransactionPayloadEntryFunction,
  RawTransaction,
  ChainId,
} = TxnBuilderTypes;

const type_parsers = {
  u64: (x: number) => BCS.bcsSerializeUint64(x),
  str: (x: string) => BCS.bcsSerializeStr(x),
  address: (x: string) =>
    BCS.bcsToBytes(AccountAddress.fromHex(new HexString(x))),
  "0x1::string:String": (x: string) =>
    BCS.bcsToBytes(AccountAddress.fromHex(new HexString(x))),
};

const TxnPreview = ({
  address,
  module,
  func,
  params,
  generic_types,
  client,
}: TxnPreviewProps) => {
  const [argList, setArgList] = useState<any[]>([]);
  const [gList, setgList] = useState<any[]>([]);
  const { account, connected } = useWallet();
  const {
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    
    signMessageAndVerify,
  } = useWallet();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateArg = (index: number, value: string, type: any) => {
    const newArgs = [...argList];
    newArgs[index] = { value: value, type: type };
    setArgList(newArgs);
  };

  const updateG = (index: number, g: string) => {
    const newArgs = [...gList];
    newArgs[index] = g;
    setgList(newArgs);
  };

  const checkTxn = (
    toAddr: string,
    sender: string,
    mod: string,
    func: string,
    generic_type_params: string[],
    args: any[]
  ) => {
    // const arg_ls = args.filter((a: Types.MoveType) => a !== "signer");
    const arg_ls = args.map((arg: any) => {
      const type = arg.type as String;
      if (type === "address") {
        return arg.value;
        // return BCS.bcsToBytes(AccountAddress.fromHex(new HexString(arg.value)));
      } else if (type === "u64") {
        return arg.value;
        // return BCS.bcsSerializeUint64(arg.value);
      } else if (type === "0x1::string::String") {
        return arg.value;
        // return {value:BCS.bcsSerializeStr(arg.value)};
      } else {
        console.log("Unknown type", type);
      }
    });

    if ("signer" in args) {
      console.log("signer in args");
    }
    onSignAndSubmitTransaction(
      toAddr,
      sender,
      mod,
      
      func,
      generic_type_params,
      arg_ls
    );

  };

  const onSignAndSubmitTransaction = async (
    toAddr: string,
    sender: string,
    mod: string,
    func: string,
    generic_type_params: string[],
    args: any[]
  ) => {
    const f = `${toAddr}::${mod}::${func}`;
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: f,
      type_arguments: generic_type_params,
      arguments: args, // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // const preview = await client.previewTransaction(payload);
      //   await aptosClient.waitForTransaction(response?.hash || "");
      //   setSuccessAlertMessage(
      //     `https://explorer.aptoslabs.com/txn/${response?.hash}`
      //   );
        console.log("response", response);
    } catch (error: any) {
      console.log("error", error);

      setErrorMsg(error);

      //   setErrorAlertMessage(error);
    }
  };

  // const payload

  const argT = (arg: string) => {
    if (arg.split("::").length == 1) {
      return arg;
    }
    if (arg.split("::").length == 2) {
      return arg.split("::")[1];
    }
    if (arg.split("::").length == 3) {
      let s = arg.split("::");
      return shortenAddress(s[1]) + "::" + s[2];
    }
  };

  return (
    <div className="items-center m-4 p-4">
      <p className="text-3xl p-2 text-center">Use Module</p>
      <div className=" items-center seam-outline shadow-pastelBlue shadow-2xl">
        <div className="flex flex-row items-start">
          <div className="flex flex-wrap items-start w-1/2 gap gap-3">
            <p className="account-outline text-2xl">{formatParam(address)}</p>
            <p className="text-3xl">::</p>

            {module !== undefined && module.abi ? (
              <ModuleOutline module_name={module.abi?.name} />
            ) : (
              <p className="text-2xl"></p>
            )}
            <p className="text-2xl">::</p>
            <p className="function-outline text-3xl">{func.name}</p>
            <div>
              {generic_types.map(
                (g: Types.MoveFunctionGenericTypeParam, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white"
                    >
                      {}
                      <p className="p-1 text-bold text-right">{"<T>"}</p>
                      <input
                        className="px-2 text-black py-2 rounded-xl outline outline-2"
                        type="text"
                        placeholder={""}
                        value={gList[index]}
                        onChange={(event) => updateG(index, event.target.value)}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div></div>

          <div className="flex flex-row md:flex-wrap items-center outline-white gap-2 ">
            {/* <div> */}
            <p>{"("}</p>
            {params
              .filter((param) => param !== "&signer")
              .map((param: Types.MoveType, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-baseline justify-start px-2 py-3 m-3 rounded-xl text-white"
                  >
                    {}
                    <input
                      className="px-3 text-black py-2 rounded-xl outline outline-2"
                      type="text"
                      placeholder={""}
                      value={argList[index]?.value}
                      onChange={(event) =>
                        updateArg(index, event.target.value, param)
                      }
                    />
                    <p className="p-1 text-bold text-left">{argT(param)}</p>
                  </div>
                );
              })}
            <p>{")"}</p>
            {/* </div> */}
          </div>
        </div>
        {params.length !== 0 && params[0] === "&signer" ? (
          <p className="text-2xl">signer</p>
        ) : (
          <p className="text-2xl">no signer</p>
        )}

      
        <button
          onClick={() =>
            checkTxn(
              address,
              account?.address?.toString() || "",
              module.abi?.name || "",
              func.name,
              gList as string[],
              argList
            )
          }
          className="seam-button "
        >
          send Txn
        </button>

        {errorMsg && (
            <div className="flex flex-col items-center justify-center">
                <p className="text-2xl text-red">{errorMsg}</p>

            </div>
        )}

      </div>
      {/* <button onClick={()=>setShowTxnModal(true)} className="seam-button ">Create Txn</button> */}
    </div>
  );
};

export default TxnPreview;
