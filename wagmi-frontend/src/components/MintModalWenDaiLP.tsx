import { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import MintFrame from "./MintFrame";
import RedeemFrame from "./RedeemFrame";

export default function MintModalWenDaiLP() {
    
    const [state, dispatch]:any = useContext(Context);
    const [mintOrRedeem, setMintOrRedeem] = useState('mint');

    function changeToMintFrame() {
        setMintOrRedeem('mint');
    }

    function changeToRedeemFrame() {
        setMintOrRedeem('redeem');
    }

    return (
        <div className="mint-modal">
            <div className="mint-modal-header">
                <div className="mint-modal-img">
                    <img src="/images/Icons/currencies/wen-dai.svg" />
                </div>
                <div className="mint-modal-title">
                    WEN-DAI LP
                </div>
            </div>
            <div className="mint-modal-prices">
                <div className="mint-modal-price">
                    <div className="title">Mint Price</div>
                    <div className="value">{state.wenPrice * state.lpDiscount}</div>
                </div>
                <div className="mint-modal-price">
                    <div className="title">WEN Price</div>
                    <div className="value">{state.wenPrice}</div>
                </div>
            </div>
            <div className="bond-form">
                <div className="bond-form-tabs">
                    <a id="mintTabButton" className="bond-form-tab mint-tab bond-form-tab-active" onClick={() => changeToMintFrame()}>
                        Mint
                    </a>
                    <a id="redeemTabButton" className="bond-form-tab redeem-tab" onClick={() => changeToRedeemFrame()}>
                        Redeem
                    </a>
                </div>
                <div className="bond-form-frame">
                    {
                        mintOrRedeem === 'mint' ? <MintFrame/> : <RedeemFrame/>
                    }
                </div>
            </div>

        </div>
    )
}