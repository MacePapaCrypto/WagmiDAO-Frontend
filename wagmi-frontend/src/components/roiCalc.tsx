import '../styling/default.css';

export default function ROICalc() {

    return(
        <div className="roiCalculatorFrame">

            <div className="calcTitle">
                <h3>Find out your potential gains</h3>
                <h1>WAGMI DAO (WEN,WEN)</h1>
            </div>

            <div className="currentStats">

                <div className="currentStat">
                    <div className="currentStatInfoTitle">Current WEN Price</div>
                    <div className="currentStatInfoVal">$0.71058965</div>
                </div>

                <div className="currentStat">
                    <div className="currentStatInfoTitle">Current Reward Yield</div>
                    <div className="currentStatInfoVal">0.7621%</div>
                </div>

                <div className="currentStat">
                    <div className="currentStatInfoTitle">Your WEN Balance</div>
                    <div className="currentStatInfoVal">0 WEN</div>
                </div>

            </div>
            <div className="roiCalculator">

                <div className="roiForm">

                    <div className="roiInput">
                        <span>WAGMI Amount</span>
                        <div className="roiinputWrapper">
                            <input type="number" placeholder="Amount" />
                            <span>MAX</span>
                        </div>
                    </div>

                    <div className="roiInput">
                        <span>Reward Yield (%)</span>
                        <div className="roiinputWrapper">
                            <input type="number" placeholder="Amount" />
                            <span>Current</span>
                        </div>
                    </div>

                    <div className="roiInput">
                        <span>WEN Price At Purchase ($)</span>
                        <div className="roiinputWrapper">
                            <input type="number" placeholder="Amount" />

                        </div>
                    </div>

                    <div className="roiInput">
                        <span>Future WEN Market Price ($)</span>
                        <div className="roiinputWrapper">
                            <input type="number" placeholder="Amount" />

                        </div>
                    </div>

                    <div className="roiSliderWrapper">
                        <span>1 Day</span><input type="range" max="365" min="1" value="1" className="dayRangeSlider" /><span>365 Days</span>
                    </div>

                </div>

                <div className="calcStats">

                    <div className="calcStat">
                        <div className="calcStatInfoTitle">How many days you're in? Until death aparts us? No?</div>
                        <div className="calcStatInfoVal"><span className="runway">1 </span>Day(s)</div>
                    </div>

                    <div className="calcStat">
                        <div className="calcStatInfoTitle">Your Initial Investment ($)</div>
                        <div className="calcStatInfoVal">1200</div>
                    </div>

                    <div className="calcStat">
                        <div className="calcStatInfoTitle">Current Wealth ($)</div>
                        <div className="calcStatInfoVal">3,751.44</div>
                    </div>

                    <div className="calcStat">
                        <div className="calcStatInfoTitle">WEN Rewards Estimation</div>
                        <div className="calcStatInfoVal">2.82 WEN</div>
                    </div>

                    <div className="calcStat">
                        <div className="calcStatInfoTitle">Potential Return ($)</div>
                        <div className="calcStatInfoVal">38,189.49</div>
                    </div>
                </div>
            </div>
        </div>
    )
}