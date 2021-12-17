import ROICalc from "./roiCalc";
import StatsComponent from "./StatsComponent";
import '../styling/default.css';
import { useContext, useEffect } from "react";
import { Context } from "../Store";
import { getWenPrice } from "../functions/ethersFunctions";

export default function DashboardPage() {
    
    const [state, dispatch]:any = useContext(Context);

    return(
        <>
        <div className="dappContainer">
            <div className="mainSection">

                <div className="mainFrameContainer">
                    <div className="mainFrame">

                        <div className="moduleWrapper">
                            <div className="module-header">
                                <h1>Dashboard (WEN,WEN)</h1>
                            </div>

                            <div className="dashboard-module">

                                <div className="dashboard-data">
                                    <div className="dashboard-data-title">
                                        Market Cap
                                    </div>
                                    <div className="dashboard-data-value">
                                        { state.marketCap }
                                    </div>
                                </div>


                                <div className="dashboard-data">
                                    <div className="dashboard-data-title">
                                        Backing per $WEN
                                    </div>
                                    <div className="dashboard-data-value">
                                        $610
                                    </div>
                                </div>


                                <div className="dashboard-data">
                                    <div className="dashboard-data-title">
                                        Treasury Balance
                                    </div>
                                    <div className="dashboard-data-value">
                                        $69,008,991
                                    </div>
                                </div>


                                <div className="dashboard-data">
                                    <div className="dashboard-data-title">
                                    APY
                                    </div>
                                    <div className="dashboard-data-value">
                                        544,757.5%
                                    </div>
                                </div>

                                <div className="dashboard-data">
                                    <div className="dashboard-data-title">
                                        Total Staked
                                    </div>
                                    <div className="dashboard-data-value">
                                        180,098
                                    </div>
                                </div>


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