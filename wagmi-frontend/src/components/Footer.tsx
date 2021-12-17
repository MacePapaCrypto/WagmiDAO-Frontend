import '../styling/default.css';
import { Link } from "react-router-dom";

export default function Footer() {

    return(
        <div className="footer">

            <div className="infoAndBuy">
                <div className="infoSocial">
                    <a href="https://discord.gg/aak5rexnbq"><img src="/images/Icons/discord.svg" alt=""/></a>
                    <a href="https://twitter.com/WagmiDAOFantom"><img src="images/Icons/twitter.svg" alt=""/></a>
                    <a href="https://medium.com/@wagmi_dao"><img src="images/Icons/Docs.svg" alt=""/></a>
                </div>

                <a href="" className="roiCalculatorButton">
                    ROI Calculator
                </a>



                <a href="https://spookyswap.finance/swap?outputCurrency=0x86d7bccb91b1c5a01a7ad7d7d0efc7106928c7f8" target="_blank" className="buyButton">
                    Buy $WEN
                </a>
            </div>


            <div className="tabMenu">
                <a className="tabMenu-item">
                    <Link to="/">Dashboard</Link>
                </a>
            
                <a className="tabMenu-item active-tab">
                    <Link to="/stake">Stake</Link>
                </a>
            
                <a className="tabMenu-item">
                    <Link to="/mint">Mint</Link>
                </a>            
            </div>
        </div>
    )
}