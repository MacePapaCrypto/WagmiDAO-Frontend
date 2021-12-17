import { useContext, useState } from 'react';
import { Context } from '../Store';
import '../styling/default.css';
import MintFrame from './MintFrame';
import MintModalDai from './MintModalDai';
import MintModalWenDaiLP from './MintModalWenDaiLP';
import RedeemFrame from './RedeemFrame';
import ROICalc from './roiCalc';
import StatsComponent from './StatsComponent';

export default function MintPage() {

    const [state, dispatch]:any = useContext(Context);

    function setBondToLP() {
        dispatch({type: 'whichBond', content: "LP"});
    }

    function setBondToDai() {
        dispatch({type: 'whichBond', content: "DAI"});
    }

    return(
        <>
        <div className="dappContainer">
            <div className="mainSection">
                <div className="mainFrameContainer">
                    <div className="mainFrame">

                        <div className="moduleWrapper">
                            <div className="module-header">
                                <h1>Mint (WEN,WEN)</h1>
                                <div className="rebase-timer">
                                    <p><span>3</span>HOURS, <span>28</span>MINS</p>
                                    <p style={{ letterSpacing: "0.25rem" }}>TO NEXT REBASE</p>
                                </div>
                            </div>

                            <div className="mint-module">

                                <div className="mint-card">
                                    <div className="mint-card-title">
                                        <div className="mint-pair-img">
                                            <img src="/images/Icons/currencies/wen-dai.svg" />
                                        </div>
                                        <div className="mint-pair-info">
                                            <div className="mint-pair-name">Wen-Dai LP</div>
                                            <a href="https://ftmscan.com/address/0x0169721fdca4c1e201F9F44CeC5fb1C0AF356AE1#tokentxns" className="mint-pair-link">
                                                View Contract
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mint-card-details">

                                        <div className="mint-card-info">
                                            Price ($)
                                            <span className="mint-price">
                                                1234.4321
                                            </span>

                                        </div>

                                        <div className="mint-card-info">
                                            Roi
                                            <span className="mint-roi">
                                                7%
                                            </span>

                                        </div>

                                        <div className="mint-card-info">
                                            Purchased ($)
                                            <span className="purchased-price">
                                                1234.4321
                                            </span>

                                        </div>

                                    </div>
                                    <a href="#" className="mint-details-button" onClick={() => setBondToLP()}>Select</a>
                                </div>

                                <div className="mint-card">
                                    <div className="mint-card-title">
                                        <div className="mint-pair-img">
                                            <img src="/images/Icons/currencies/daiLogo.svg" />
                                        </div>
                                        <div className="mint-pair-info">
                                            <div className="mint-pair-name">DAI</div>
                                            <a href="https://ftmscan.com/token/0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e?a=0xe120ffBDA0d14f3Bb6d6053E90E63c572A66a428" className="mint-pair-link">
                                                View Contract
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mint-card-details">

                                        <div className="mint-card-info">
                                            Price ($)
                                            <span className="mint-price">
                                                1234.4321
                                            </span>

                                        </div>

                                        <div className="mint-card-info">
                                            Roi
                                            <span className="mint-roi">
                                                7%
                                            </span>

                                        </div>

                                        <div className="mint-card-info">
                                            Purchased ($)
                                            <span className="purchased-price">
                                                1234.4321
                                            </span>

                                        </div>

                                    </div>
                                    <a href="#" className="mint-details-button" onClick={() => setBondToDai()}>Select</a>
                                </div>
                            </div>
                            {
                                state.whichBond === 'LP' ? <MintModalWenDaiLP/> : <MintModalDai/>
                            }
                        </div>

                    </div>
                    <div className="shadow1"></div>
                    <div className="shadow2"></div>
                </div>

                <StatsComponent />
            </div>
        </div>
        <ROICalc /></>
    )
}