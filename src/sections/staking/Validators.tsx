import { Types } from "aptos";
import { BASE_TYPES } from "BaseStyles";
import AccountOutline from "components/etc/AccountOutline";
import { format_large_number, shortenAddress } from "hooks/formatting";
import StakeForm from "hooks/StakeInputs";
import useStakeInputs from "hooks/StakeInputs";
import { loadValidators, useClient } from "hooks/useAptos";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSubmitStake from "../../hooks/useStake";
import { validator_addresses } from './validator_data';
import { useStakeQuery } from "hooks/useGql";
import { useApolloClient } from "@apollo/client";

export function StakePage() {

  return (

    <div className="">

      <p className="text-2xl">Manual Staking</p>
      <StakeForm />
    </div>

  );
}



const ValidatorPreview = (validatorSample: any) => {


  return (<div className="flex flex-col">
    <p className="text-2xl text-center"> Validator Overview</p>
    <p>completed:{validatorSample.successful_proposals}</p>
    <p>failed:{validatorSample.failed_proposals}</p>
  </div>)

}

type BlockStatProps = {
  label: string;
  value: number;
  multiplier?: number;
}

const BlockStat: React.FC<BlockStatProps> = ({ label, value,multiplier }) => {
  return (
    <div className="flex flex-col bg-lightPurple bg-opacity-40 p-1 mt-2 rounded-xl max-w-lg ">
      <p className={` text-right ${BASE_TYPES.BASE_LG} mt-2`}>{format_large_number(value)}</p>
      <p className={`text-right ${BASE_TYPES.BASE_T4} `}>{label}</p>
    </div>
  );
}




const Validators = () => {
  // const [validatorData, setVData] = useState<any>();
  const validators = useLoaderData() as any;
  const client= useApolloClient();
  const { data: stakeData, loading: stakeLoading } = useStakeQuery();

  function sortfunc(a: any, b: any) {
    return b.voting_power - a.voting_power;
  }
  // const 



  const ValidatorsOverView = () => {
    if(validators?.validatorInfo.validators){
      const cumulativeVotingPower = validators.validatorInfo.validators.reduce((a: any, b: any) => a +b.voting_power/1,0 );
      // show the average voting power of the top 100 validators
      const averageVotingPower = cumulativeVotingPower / 100;
      const num_validators = validators.validatorInfo.validators.length;


      return (
        <div>
          <BlockStat label="Avg. Stake" value={averageVotingPower} />
          <BlockStat label="Cumulative Stake of Validators" value={cumulativeVotingPower} />
          <BlockStat label="Total Validators" value={num_validators} />
        </div>
      )

    }else{return(<div></div>)}

  }


  return (
    <div className="flex flex-col gap gap-2">
        <h1 className="text-4xl">Active Validators</h1>
      <ValidatorsOverView />
      <div className="flex flex-wrap items-start">
        {validators?.validatorInfo?.validators.sort(sortfunc).map((v: any, i: number) => {
          // const v_history 


          return (
            <div className="flex flex-col seam-outline py-2 justify-between items-start px-3 m-3" key={i}>
              <div className="flex flex-row justify-between items-start gap gap-2">
                <p className="text-4xl opacity-70 text-right">#</p>
                <p className="text-6xl">{v.config.validator_index}</p>
              </div>
              
                <div>
                  <p className="text-4xl pt-1">{format_large_number(v.voting_power)}</p>
                  <p className="text-xl opacity-60"> Voting power</p>
                </div>
              
              <div>
                <div>
                  <AccountOutline addr={v.addr} />
                  <p className="text-lg text-bold  text-center items-center justify-center">Validator addr.</p>
                </div>
                <div>
                  <AccountOutline addr={v.config.fullnode_addresses} />
                  <p className="text-lg text-bold text-center items-center justify-center">FullNodde addr.</p>
                </div>
              </div>

              <button className="seam-button opacity-40" data-tip="COMING SOON"> Stake</button>

            </div>
          )
        })}
      </div>

      <div>
      </div>
    </div>
  )
}

export default Validators;