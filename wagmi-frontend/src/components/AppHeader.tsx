import ConnectWallet from './ConnectWallet';
import { useContext, useEffect } from 'react';
import { Context } from '../Store';
import { getWenPrice } from '../functions/ethersFunctions';

function AppHeader() {

  const [state]:any = useContext(Context);

  let darkMode = localStorage.getItem("dark-mode");
  let darkModeButton =  document.querySelector(".darkModeButton");
  let defaultModeButton =  document.querySelector(".defaultThemeButton");

  //Dark Mode Settings
  if(darkModeButton) {
    darkModeButton.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "on");
    });
  }

  if(defaultModeButton) {
    defaultModeButton.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.remove("dark-mode");
        localStorage.setItem("dark-mode", "off");
    });
  }

  window.addEventListener('DOMContentLoaded', (event) => {
      if(darkMode === "on"){
          document.body.classList.add("dark-mode");
      }
      else{
          document.body.classList.remove("dark-mode");
      }
  });

  const displayNetworkStatusText = () => {
    if (state.walletContextDetected) {
      if (state.onFantomNetwork) {
        return "On Fantom Opera";
      } else {
        return "Please connect to Fantom Opera";
      }
    } else {
      return "Please connect wallet.";
    }
  }

  return (
    <div className="app-header">
      <div className="statsButtonSurface">
          <a href="#" className="statsButton"><img src="/images/Icons/statsIcon.svg" alt=""/>Stats</a>
      </div>


      <div className="topBar">
          <a href="/" className="logo">
              <img src="images/Branding/Logo/logo.svg" alt="WAGMI DAO" />
          </a>

          <div className="priceTag"><img src="/images/Icons/wen-price-logo.svg" alt=""/>{'$' + new Intl.NumberFormat('en-US').format(parseFloat(state.wenPrice))}</div>
          <div className="themeModeButtons">
              <a href="#" className="darkModeButton"><img src="/images/Icons/cloud.svg" alt="Switch to dark mode" /></a>
              <a href="#" className="defaultThemeButton"><img src="/images/Icons/sun.svg" alt="Switch to default theme" /></a>

          </div>
          <ConnectWallet/>
      </div>
    </div>
  );
}

export default AppHeader;
