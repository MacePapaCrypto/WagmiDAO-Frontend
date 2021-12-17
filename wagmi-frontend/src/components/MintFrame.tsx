import { useContext, useEffect, useState } from "react";
import { Context } from '../Store';
import { 
    checkApprovedDaiForMint, checkWenDaiLPApprovedForMint, approveWenDaiLPToMint,
    approveDaiToMint, mintWenDaiLP, mintDai
} from '../functions/ethersFunctions';

export default function MintFrame() {

    const [spendInput, setSpendInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, dispatch]:any = useContext(Context);

    useEffect(() => {
        async function fetchApproval() {
            if(state.walletAddress) {
                await checkWenDaiLPApprovedForMint(dispatch);
                await checkApprovedDaiForMint(dispatch);
                console.log(state.isWenDaiLPApprovedForMint);
                console.log(state.isDaiApprovedForMint);
                console.log(loading);
                console.log(state.whichBond);
                console.log(state.slippage);
            }
            else {
                dispatch({type: 'isWenDaiLPApprovedForMint', content: false});
                dispatch({type: 'isDaiApprovedForMint', content: false});
            }
        }
        
        fetchApproval();
    }, []);

    async function prepApproveLP(spendInput:any) {
        console.log("In prep LP approve");
        setLoading(true);
        await approveWenDaiLPToMint(dispatch, spendInput);
        setLoading(false);
    }

    async function prepApproveDai(spendInput:any) {
        console.log("In prep DAI approve");
        setLoading(true);
        await approveDaiToMint(dispatch, spendInput);
        setLoading(false);
    }

    return (
        <div className="bond-frame">
            <div className="mintInputWrapper">
                <input type="number" value={spendInput} onInput={e => setSpendInput((e.target as HTMLInputElement).value)} placeholder="Amount" />
                <span>MAX</span>
            </div>
            <div className="mintInputWrapper">
                <input type="number" onInput={e => dispatch({type: '', content:((e.target as HTMLInputElement).value)})} placeholder="Slippage" />
            </div>
            {
                (state.whichBond === "LP" && !state.isWenDaiLPApprovedForMint && !loading) ?
                    <a 
                        href="#"
                        className="bond-default-button mint-button"
                        onClick={async () => await prepApproveLP(spendInput)}
                    >
                        Approve LP
                    </a> : (state.whichBond === "LP" && state.isWenDaiLPApprovedForMint && !loading) ?
                        <a 
                            href="#"
                            className="bond-default-button mint-button"
                            onClick={async () => await mintWenDaiLP(dispatch, spendInput, state.slippage, state.wenPrice)}
                        >
                            Bond LP and Mint Wen
                        </a> : (state.whichBond === "DAI" && !state.isDaiApprovedForMint && !loading) ?
                            <a 
                                href="#"
                                className="bond-default-button mint-button"
                                onClick={async () => await prepApproveDai(spendInput)}
                            >
                                Approve Dai
                            </a> : (state.whichBond === "DAI" && state.isDaiApprovedForMint && !loading) ?
                                <a 
                                    href="#"
                                    className="bond-default-button mint-button"
                                    onClick={async () => await mintDai(dispatch, spendInput, state.slippage)}
                                >
                                    Bond Dai, Mint Wen
                                </a> : <a className="bond-default-button mint-button">Awaiting Tx...</a>
            }

            <div className="warning-text">
                Note: The "Approve" transaction is only needed when staking/unstaking for the first time;
                subsequent staking/unstaking only requires you to perform the "Stake" or "Unstake" transaction.
            </div>



            <div className="bond-balance">

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Your Balance
                    </div>
                    <div className="bond-balance-value">
                        0 LP
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        You Will Get
                    </div>
                    <div className="bond-balance-value">
                        0 WEN
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Max You Can Buy
                    </div>
                    <div className="bond-balance-value">
                        171.8457 WEN
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        ROI
                    </div>
                    <div className="bond-balance-value">
                        5.95%
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Vesting Term
                    </div>
                    <div className="bond-balance-value">
                        5 Days
                    </div>
                </div>

            </div>
        </div>
    )
}