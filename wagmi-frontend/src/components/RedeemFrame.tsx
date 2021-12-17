export default function RedeemFrame() {
    return(
        <div className="bond-frame">
            <a href="#" className="bond-default-button redeem-button">
                Claim
            </a>
            <a href="#" className="bond-default-button redeem-button">
                Claim & Autostake
            </a>

            <div className="bond-balance">
                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Pending Rewards
                    </div>
                    <div className="bond-balance-value">
                        0 WEN
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Claimable Rewards
                    </div>
                    <div className="bond-balance-value">
                        0 WEN
                    </div>
                </div>

                <div className="bond-balance-info">
                    <div className="bond-balance-title">
                        Time until fully vested
                    </div>
                    <div className="bond-balance-value">
                        5 Days
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