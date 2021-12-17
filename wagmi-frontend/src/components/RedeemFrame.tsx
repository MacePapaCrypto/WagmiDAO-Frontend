import { useContext, useEffect } from "react";
import { redeemBondsAndStakeForLP, redeemBondsForDai, redeemBondsForLP } from "../functions/ethersFunctions";
import { Context } from "../Store";

export default function RedeemFrame() {

    const [state, dispatch]:any = useContext(Context);

    return(
        <div className="bond-frame">
            {
                state.whichBond === 'LP' ? 
                <><a href="#" className="bond-default-button redeem-button" onClick={() => redeemBondsForLP(dispatch)}>
                        Claim
                  </a>
                  <a href="#" className="bond-default-button redeem-button" onClick={() => redeemBondsAndStakeForLP(dispatch)}>
                            Claim & Autostake
                  </a></> :
                <><a href="#" className="bond-default-button redeem-button" onClick={() => redeemBondsForDai(dispatch)}>
                    Claim
                </a>
                <a href="#" className="bond-default-button redeem-button" onClick={() => redeemBondsForDai(dispatch)}>
                    Claim & Autostake
                </a></>
            
            }
            

            <div className="bond-balance">
                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Claimable Rewards
                    </div>
                    <div className="bond-balance-value">
                        {state.claimableRewards}
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Time until fully vested
                    </div>
                    <div className="bond-balance-value">
                        {state.timeLeftVested}
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        ROI
                    </div>
                    <div className="bond-balance-value">
                        {state.whichBond === 'LP' ? state.lpBondROI : state.daiBondROI}
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