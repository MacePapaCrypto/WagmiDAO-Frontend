import ROICalc from "./roiCalc";
import StatsComponent from "./StatsComponent";
import '../styling/default.css';
import React, { useEffect, useRef, useState } from 'react';
import { Context } from '../Store';
import { useContext } from 'react';
import { 
    checkApprovedForStaking, checkApprovedForUnstaking,
    stakeWen, unstakeWen, approveStakedWenToUnstake, approveWenToStake 
} from '../functions/ethersFunctions';

export default function StakePage() {

    const [stakeMode, setStakeMode] = useState('stake');
    const [spendInput, setSpendInput] = useState('');
    const [state, dispatch]:any = useContext(Context);
    //const [approved, setApproved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchApproval() {
            if(state.walletAddress) {
                await checkApprovedForStaking(dispatch);
                await checkApprovedForUnstaking(dispatch);
                console.log(state.isWenApprovedForStaking);
                console.log(state.isWenApprovedForUnstaking);
            }
            else {
                dispatch({type: 'isWenApprovedForStaking', content: false});
                dispatch({type: 'isWenApprovedForUnstaking', content: false});
            }
        }
        
        fetchApproval();
    }, [state.walletAddress]); 

    function prepStakeMode() {
        console.log("In Stake Mode");
        setStakeMode('stake');
    }

    function prepUnstakeMode() {
        console.log("In Unstake Mode");
        setStakeMode('unstake');
    }

    async function prepApprove(amountToSpend:any) {
        console.log("made inside prep");
        setLoading(true);
        await approveWenToStake(dispatch, amountToSpend);
        setLoading(false);
        console.log(state.isWenApprovedForStaking);
    }

    async function prepUnstakeApprove(amountToSpend:any) {
        console.log("made inside prep");
        setLoading(true);
        await approveStakedWenToUnstake(dispatch, amountToSpend);
        setLoading(false);
        console.log(state.isWenApprovedForUnstaking);
    }

    async function prepStakeWen(amountToStake:any) {
        setLoading(true);
        await stakeWen(dispatch, amountToStake);
        setLoading(false);
        console.log(state.isUserStaked);
    }

    async function prepUnstakeWen(amountToUnstake:any) {
        setLoading(true);
        await unstakeWen(dispatch, amountToUnstake);
        setLoading(false);
        console.log(state.isUserStaked);
    }


    //Come back to this and write logic to check if staked. If you are staked, check if approved to unstake, then allow unstake.
    return(
        <>
        <div className="dappContainer">
            <div className="mainSection">

                <div className="mainFrameContainer">
                    <div className="mainFrame">
                        
                        
                        <div className="moduleWrapper">
                            <div className="module-header">
                                <h1>Stake (WEN,WEN)</h1>
                                <div className="rebase-timer">
                                    <p><span>3</span>HOURS, <span>28</span>MINS</p>
                                    <p style={{letterSpacing: "0.25rem"}}>TO NEXT REBASE</p>
                                </div>
                            </div>
                            <div className="stake-module">
                                <div className="stake-tabs">
                                    <div className="stake-tab stake-tab-active" onClick={() => prepStakeMode() }>
                                        Stake
                                    </div>
                                    <div className="stake-tab" onClick={() => prepUnstakeMode() }>
                                        Unstake
                                    </div>
                                </div>
                                <div className="stake-form">
                                    <div className="stake-input">
                                        <input type="number" value={spendInput} onInput={e => setSpendInput((e.target as HTMLInputElement).value)} placeholder="Amount"/>
                                        <span>MAX</span>
                                    </div>
                                    { 
                                        stakeMode === 'stake' && !state.isWenApprovedForStaking && !loading ?
                                        <a href="#" className="stake-button" onClick={async () => await prepApprove(spendInput)}>Approve Stake</a> :
                                        stakeMode === 'stake' && state.isWenApprovedForStaking && !loading ?
                                        <a href="#" className="stake-button" onClick={async () => await prepStakeWen(spendInput)}>Stake WEN</a> :
                                        stakeMode === 'unstake' && !state.isWenApprovedForUnstaking && !loading ?
                                        <a href="#" className="stake-button" onClick={async () => await prepUnstakeApprove(spendInput)}>Approve Unstake</a> :
                                        stakeMode === 'unstake' && state.isWenApprovedForUnstaking && !loading ?
                                        <a href="#" className="stake-button" onClick={async () => await prepUnstakeWen(spendInput)}>Unstake WEN</a> :
                                        <a className="stake-button">Awaiting Tx...</a>
                                    }
                                </div>
                            </div>
                            <div className="warning-text">
                                Note: The "Approve" transaction is only needed when staking/unstaking for the first time; 
                                subsequent staking/unstaking only requires you to perform the "Stake" or "Unstake" transaction.
                            </div>

                        </div>
                    </div>
                    <div className="shadow1"></div>
                    <div className="shadow2"></div>
                </div>
                <StatsComponent/>
            </div>
        </div>
        <ROICalc/>
        </>
    )
}