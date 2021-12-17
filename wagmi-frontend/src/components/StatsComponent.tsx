import '../styling/default.css';

export default function StatsComponent() {

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
                    <span>TVL</span> <div className="tvlVal"> $1,358,558,228</div>
                </div>
                <div className="APY">
                    <span>APY</span> <div className="apyVal"> 8,123,456.3%</div>
                </div>
                <div className="CurrentIndex">
                    <span>Current Index</span> <div className="currentIndexVal">3.35 WEN</div>
                </div>
            </div>

            <div className="mintStats">
                <h3>Mint Discounts</h3>
                <div className="mintPairs">
                    <div className="mintPair">WEN-MIM LP</div> <div className="mintDiscount">6.64%</div>
                </div>
                <div className="mintPairs">
                    <div className="mintPair">WEN-MIM LP</div> <div className="mintDiscount">6.64%</div>
                </div>
                <div className="mintPairs">
                    <div className="mintPair">WEN-MIM LP</div> <div className="mintDiscount">6.64%</div>
                </div>
                <div className="mintPairs">
                    <div className="mintPair">WEN-MIM LP</div> <div className="mintDiscount">6.64%</div>
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