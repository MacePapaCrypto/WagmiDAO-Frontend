import { useContext } from 'react';
import { Context } from '../Store';
import '../styling/default.css';

export default function StatsComponent() {

    const [state, dispatch]:any = useContext(Context);
    
    let statsButton =  document.querySelector(".statsButton");
    let statsSection =  document.querySelector(".statsSection");

    if(statsButton) {
        statsButton.addEventListener("click", (e) => {
            e.preventDefault();
            let toTop = document.querySelector(".dappContainer");
            if(statsSection && statsButton) {
                statsSection.classList.toggle("showStats");
                statsButton.classList.toggle("statsButton-open");
                window.requestAnimationFrame(() => toTop!.scrollIntoView({
                    behavior: "smooth", block: "start"
                }))
            }
        });
    }

    return(
        <div className="statsSection">

            <div className="TVLStats">
                <div className="TVL">
                    <span>TVL</span> <div className="tvlVal">{state.stakedTVL}</div>
                </div>
                <div className="APY">
                    <span>APY</span> <div className="apyVal">{state.stakeAPY}</div>
                </div>
                <div className="CurrentIndex">
                    <span>Current Index</span> <div className="currentIndexVal">{state.index}</div>
                </div>
            </div>

            <div className="mintStats">
                <h3>Mint Discounts</h3>
                <div className="mintPairs">
                    <div className="mintPair">WEN-DAI LP</div> <div className="mintDiscount">69.6%</div>
                </div>
                <div className="mintPairs">
                    <div className="mintPair">DAI</div> <div className="mintDiscount">6.69%</div>
                </div>
            </div>

            <div className="stakeStats">


                <div className="stakeInfo">
                    <div className="stakeInfoTitle">Your Balance</div> <div className="stakeInfoVal">0 WEN</div>
                </div>
                <div className="stakeInfo">
                    <div className="stakeInfoTitle">Your Staked Balance</div> <div className="stakeInfoVal">0 sWEN</div>
                </div>
                <div className="stakeInfo">
                    <div className="stakeInfoTitle">Next Reward Yield</div> <div className="stakeInfoVal">0.8140%</div>
                </div>
                <div className="stakeInfo">
                    <div className="stakeInfoTitle">Next Reward Amount</div> <div className="stakeInfoVal">0 WEN</div>
                </div>
                <div className="stakeInfo">
                    <div className="stakeInfoTitle">ROI (5-Day Rate)</div> <div className="stakeInfoVal">12.9320%</div>
                </div>


            </div>

        </div>
    )
}