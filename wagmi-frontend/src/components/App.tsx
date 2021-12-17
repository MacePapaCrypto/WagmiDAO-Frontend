/* eslint-disable react/jsx-no-undef */
import React, { useContext, useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Context } from '../Store';
import { ethers } from 'ethers';

import AppHeader from './AppHeader';

import { getWenPrice, initializeEthers } from '../functions/ethersFunctions';

import '../styling/App.css';
import Footer from './Footer';
import MintPage from './MintComponent';
import DashboardPage from './Dashboard';
import StakePage from './Stake';

declare const window:any;

function App() {

  const [state, dispatch]:any = useContext(Context);

  const checkMetaMaskContext = () => {
    try {
      new ethers.providers.Web3Provider(window.ethereum);
      return true;
    } catch {
      return false;
    }
  }
  
  const fetchWenPrice = async () => {
    await getWenPrice(dispatch);
    console.log("This is wen price: " + state.wenPrice);
  }

  useEffect(() => {
    if (checkMetaMaskContext()) {
      initializeEthers(dispatch);
      window.ethereum.on("chainChanged", (chainId:string) => {
        if (chainId === "0xfa") {
          dispatch({type: "onFantomNetwork", content: true});
        } else {
          dispatch({type: "onFantomNetwork", content: false});
        }
      });
    }
  }, []);

  useEffect(() => {
    fetchWenPrice()
  }, [state.triggerAll]);

  return (
    <Router>
        <AppHeader/>
        <div>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
            </Routes>
            <Routes>
                <Route path="/mint" element={<MintPage />} />
            </Routes>
            <Routes>
                <Route path="/stake" element={<StakePage />} />
            </Routes>
        </div>
        <Footer/>
    </Router>
  );
}

export default App;

/*
<Route path="/mint">
                    <Mint/>
                </Route>
                <Route path="/stake">
                    <Stake/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
                */