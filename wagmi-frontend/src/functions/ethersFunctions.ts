import { BigNumber, ethers } from 'ethers';
import WenABI from '../contractABIs/WenABI.json';
import sWenABI from '../contractABIs/sWenABI.json';
import wenDaiLPABI from '../contractABIs/wenDaiLPABI.json';
import daiABI from '../contractABIs/daiABI.json';
import treasuryABI from '../contractABIs/treasuryABI.json';
import distributorABI from '../contractABIs/distributorABI.json';
import wenStakingHelperABI from '../contractABIs/wenStakingHelperABI.json';
import wenStakingABI from '../contractABIs/wenStakingABI.json';
import stakingWarmupABI from '../contractABIs/stakingWarmupABI.json';
import daiBondDepositoryABI from '../contractABIs/daiBondDepositoryABI.json';
import bondingCalcABI from '../contractABIs/bondingCalcABI.json';
import { useContext } from 'react';
import { Context } from '../Store';


declare const window:any;
let provider:any = undefined;
let wenContract:any = undefined;
let sWenContract:any = undefined;
let wenStakingHelperContract:any = undefined;
let wenStakingContract:any = undefined;
let wenDaiLPContract:any = undefined;
let daiContract:any = undefined;
let treasuryContract:any = undefined;
let distributorContract:any = undefined;
let wenStakingWarmupContract:any = undefined;
let daiBondDepositoryContract:any = undefined;
let bondingCalculatorContract:any = undefined;
const FANTOM_NETWORK_ID = "250";

//Provider and Initialization
export const initializeEthers = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const addr = await signer.getAddress();

    if (window.ethereum.networkVersion === FANTOM_NETWORK_ID) {
      dispatch({type:"onFantomNetwork", content:true});
    }
    dispatch({type: 'walletContextDetected', content: true });
    dispatch({type: 'triggerAll', content: true});

    wenContract = new ethers.Contract(
      "0x86D7BcCB91B1c5A01A7aD7D7D0eFC7106928c7F8",
      WenABI,
      signer
    );
    sWenContract = new ethers.Contract(
      "0x74d02d9cfe67f1fc60019db470b46f5b0dc82b32",
      sWenABI,
      signer
    );
    wenDaiLPContract = new ethers.Contract(
      "0x0169721fdca4c1e201F9F44CeC5fb1C0AF356AE1",
      wenDaiLPABI,
      signer
    );
    daiContract = new ethers.Contract(
      "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
      daiABI,
      signer
    );
    treasuryContract = new ethers.Contract(
      "0x25b6e27a7279ae1ea95d29078d1d35200813035c",
      treasuryABI,
      signer
    );
    wenStakingHelperContract = new ethers.Contract(
      "0xaf9e3ce67bd74570fc3e3b4c1b985c2af0f0d0dc",
      wenStakingHelperABI,
      signer
    );
    wenStakingContract = new ethers.Contract(
      "0x1a16805c1e60e7bf206304efdf31e7b8a151235b",
      wenStakingABI,
      signer
    );
    wenStakingWarmupContract = new ethers.Contract(
      "0x1176551a5bf1fa27caef9ea5dcb4762e9b4f0859",
      stakingWarmupABI,
      signer
    );
    daiBondDepositoryContract = new ethers.Contract(
      "0x7f4aea8a240a8f5c0e62eb387d1f929536e1b756",
      daiBondDepositoryABI,
      signer
    );
    bondingCalculatorContract = new ethers.Contract(
      "0xffb293e20babd58cb10d3c3640b2806da63ad4a8",
      bondingCalcABI,
      signer
    );
    distributorContract = new ethers.Contract(
      "0xef171963a1ca74eaa47cd98f3d53a44269fbcff8",
      distributorABI,
      signer
    );

    return addr;
  } catch (error) {
    console.log(error);
    dispatch({type: 'walletContextDetected', content: false });
    dispatch({type:"onFantomNetwork", content: false});
    return undefined;
  }
}

export const checkNetwork = () => {
  try {
    return (window.ethereum.networkVersion === FANTOM_NETWORK_ID);
  } catch {
    return false;
  }
}

//Contract Queries for various data
export const getTreasuryTVL = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const treasuryDai = await daiContract.balanceOf("0x25b6e27a7279ae1ea95d29078d1d35200813035c");
    const treasuryLP = await wenDaiLPContract.balanceOf("0x25b6e27a7279ae1ea95d29078d1d35200813035c");
    const treasuryTVLNumber = (treasuryLP + treasuryDai).toNumber();
    dispatch({type: 'treasuryTVL', content: treasuryTVLNumber});
  } catch(error) {
    console.log(error);
  }
}

export const getWenPrice = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner();
    const reserveTokenAmount = await wenDaiLPContract.getReserves();
    const wenReserveAmount = BigNumber.from(reserveTokenAmount[0]);
    const daiReserveAmount = BigNumber.from(reserveTokenAmount[1]);
    //console.log(wenReserveAmount.toString());
    //console.log(daiReserveAmount.toString());
    const wenTokenPrice = daiReserveAmount.div(wenReserveAmount).div(1e7);
    console.log(wenTokenPrice.toString());
    let stringWenPrice = wenTokenPrice.toString();
    let resStr = stringWenPrice.substring(0,stringWenPrice.length-2)+"."+stringWenPrice.substring(stringWenPrice.length-2);
    console.log(resStr);
    dispatch({type: 'wenPrice', content: parseFloat(resStr)});
  } catch(error) {
    return console.log(error);
  }
}

export const getWenSupply = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const supplyOfWen = await wenContract.totalSupply();
    let value = (supplyOfWen.div(1e9).toNumber().toFixed(9));
    console.log(value);
    console.log(supplyOfWen.div(1e9).toNumber());
    dispatch({type: 'totalWenSupply', content: supplyOfWen.div(1e9).toNumber()});
  } catch(error) {
    console.log(error);
  }
}

export const mintDiscounts = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting mint discounts");
  }
}

export const getMaxBuyFromLP = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } catch(error) {
    console.log(error);
  }
}

export const getMaxBuyFromDai = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const maxPayout = await daiBondDepositoryContract.maxPayout();
    dispatch({type: 'maxPayoutDai', content: maxPayout})
  } catch(error) {
    console.log(error);
  }
}

export const getBalanceOfDai = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const daiBalance = await daiContract.balanceOf(signer.getAddress());
    console.log(daiBalance.toString());
    dispatch({type: "balanceOfDai", content: daiBalance.toString()});
  } catch(error) {
    return console.log(error);
  }
}

export const getBalanceOfLP = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const lpBalance = await wenDaiLPContract.balanceOf(signer.getAddress());
    console.log(lpBalance.toString());
    dispatch({type: "balanceOfLP", content: lpBalance.toString()});
  } catch(error) {
    return console.log(error);
  }
}

export const getBalanceOfWen = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wenBalance = await wenContract.balanceOf(signer.getAddress());
    console.log(wenBalance.toString());
    dispatch({type: "wenBalance", content:wenBalance.toString()});
  } catch(error) {
    return console.log(error);
  }
}

export const getBalanceOfsWen = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sWenBalance = await sWenContract.balanceOf(signer.getAddress());
    console.log(sWenBalance.toString());
    dispatch({type: "sWenBalance", content:sWenBalance.toString()});
  } catch(error) {
    return console.log(error);
  }
}

export const nextRewardAmount = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch(error) {
    return console.log(error);
  }
}

export const nextRewardYield = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch(error) {
    return console.log(error);
  }
}

export const getClaimableRewards = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch(error) {
    return console.log(error);
  }
}

//can get ROI for both contracts here
//nextRewardsYield * nbEpoch/day * 5 to derive value
export const getROI = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch(error) {
    return console.log(error);
  }
}

export const getIndex = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch(error) {
    return console.log(error);
  }
}

//staking * market price to derive TVL value
export const getStakingTVL = async (dispatch:any, wenPrice:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedStakingContract = await wenStakingContract.connect(signer);
    const stakeTVL = await connectedStakingContract.contractBalance();
    const usdStakedTVL = stakeTVL * wenPrice;
    dispatch({type: 'stakingTVL', conent: usdStakedTVL});
  } catch(error) {
    return console.log(error);
  }
}

//APY = (1 + (APR per epoch / # of epochs per day)) ** (number of epochs per day) - 1
export const getAPY = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedDaiBondDepo = await daiBondDepositoryContract.connect(signer);
  } catch(error) {
    return console.log(error);
  }
}

export const getBondValues = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedDaiBondDepo = await daiBondDepositoryContract.connect(signer);
    //const connectedLPBondDepo = await lpBondDepositoryContract.connect(signer);
  } catch(error) {
    return console.log(error);
  }
}

//Main Contract Function Helpers
export const checkApprovedForStaking = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //second address param needs to be changed to staking contract when deployed
    const wenBalanceApproved = await wenContract.allowance(signer.getAddress(), wenStakingHelperContract.address);
    console.log(wenBalanceApproved.toString());
    if(wenBalanceApproved.toString() === '0') {
      dispatch({type: 'isWenApprovedForStaking', content: false});
      console.log(wenBalanceApproved.toString());
    }
    else {
      dispatch({type: 'isWenApprovedForStaking', content: true});
      console.log(wenBalanceApproved.toString());
    }
  } catch {
    return false;
  }
}

export const checkApprovedForUnstaking = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //second address param needs to be changed to staking contract when deployed
    const sWenBalanceApproved = await sWenContract.allowance(signer.getAddress(), wenStakingContract.address);
    console.log(sWenBalanceApproved.toString());
    if(sWenBalanceApproved.toString() === '0') {
      dispatch({type: 'isWenApprovedForUnstaking', content: false});
      console.log(sWenBalanceApproved.toString());
    }
    else {
      dispatch({type: 'isWenApprovedForUnstaking', content: true});
      console.log(sWenBalanceApproved.toString());
    }
  } catch {
    return false;
  }
}


export const checkWenDaiLPApprovedForMint = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedWenDaiLPContract = await wenDaiLPContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const approvedBalance = await connectedWenDaiLPContract.allowance(signer.getAddress(), signer.getAddress());
    if(approvedBalance.toString() === '0') {
      dispatch({type: 'isWenDaiLPApprovedForMint', content: false});
      console.log(approvedBalance.toString());
    } else {
      dispatch({type: 'isWenDaiLPApprovedForMint', content: true});
      console.log(approvedBalance.toString());
    }
  } catch {
    return console.log("error with LP approve");
  }
}

export const checkApprovedDaiForMint = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedDaiContract = await daiContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const approvedBalance = await connectedDaiContract.allowance(daiBondDepositoryContract.address, signer.getAddress());
    if(approvedBalance.toString() === '0') {
      dispatch({type: 'isDaiApprovedForMint', content: false});
      console.log(approvedBalance.toString());
    } else {
      dispatch({type: 'isDaiApprovedForMint', content: true});
      console.log(approvedBalance.toString());
    }
  } catch {
    return console.log("error checking Dai approve");
  }
}

export const approveWenToStake = async (dispatch:any,) => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    try {
      const connectedWenContract = await wenContract.connect(signer);
      const fixedAmountToSpend = ethers.constants.MaxUint256; //max
      console.log(fixedAmountToSpend.toString());
      //Need to change spender to staking contract after deploy
      const tx = await connectedWenContract.approve(wenStakingHelperContract.address, fixedAmountToSpend);
      console.log("Changing approved state to true");
      dispatch({type: 'isWenApprovedForStaking', content: true});
    } catch(error) {
      return console.log(error);
    }
}

export const approveStakedWenToUnstake = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedsWenContract = await sWenContract.connect(signer);
    const fixedAmountToSpend = ethers.constants.MaxUint256; //max
    //Need to change spender to staking contract after deploy
    const tx = await connectedsWenContract.approve(wenStakingContract.address, fixedAmountToSpend);
    dispatch({type: 'isWenApprovedForUnstaking', content: true});
  } catch {
    return console.log("error");
  }
}

export const approveWenDaiLPToMint = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedWenDaiLPContract = await wenDaiLPContract.connect(signer);
    const fixedAmountToSpend = ethers.constants.MaxUint256; //max
    //Need to change spender to staking contract after deploy
    const tx = await connectedWenDaiLPContract.approve(daiBondDepositoryContract.address, fixedAmountToSpend);
    dispatch({type: 'isWenDaiLPApprovedForMint', content: true});
  } catch(error) {
    return console.log(error);
  }
}

export const approveDaiToMint = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedDaiContract = await daiContract.connect(signer);
    const fixedAmountToSpend = ethers.constants.MaxUint256; //max
    //Need to change spender to staking contract after deploy
    const tx = await connectedDaiContract.approve(daiBondDepositoryContract.address, fixedAmountToSpend);
    dispatch({type: 'isDaiApprovedForMint', content: true});
  } catch(error) {
    return console.log(error);
  }
}

export const stakeWen = async (dispatch:any, amountToStake:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fixedAmountToStake = amountToStake * 1e9;
    console.log(fixedAmountToStake);
    const connectedStakingHelperContract = await wenStakingHelperContract.connect(signer);
    const tx = await connectedStakingHelperContract.stake(fixedAmountToStake, signer.getAddress());
    dispatch({type: 'isUserStaked', content: true});
  } catch(error) {
    return console.log(error);
  } 
}

export const unstakeWen = async (dispatch:any, amountToUnstake:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedStakingContract = await wenStakingContract.connect(signer);
    const fixedAmountToUnstake = amountToUnstake * 1e9;
    console.log(fixedAmountToUnstake.toString())
    const tx = await connectedStakingContract.unstake(1, fixedAmountToUnstake);
    dispatch({type: 'isUserStaked', content: false});
  } catch(error) {
    return console.log(error);
  }
}

export const mintWenDaiLP = async (dispatch:any, amountToSpend:any, slippage:any, wenPrice:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fixedAmountToSpend = amountToSpend * 1e9;
    console.log(fixedAmountToSpend.toString());
    const maxPrice = wenPrice + ((slippage / 100) * wenPrice);
    const connectedDaiBondDepo = await daiBondDepositoryContract.connect(signer);
    const tx = await connectedDaiBondDepo.deposit(fixedAmountToSpend, maxPrice, signer.getAddress());
  } catch(error) {
    console.log(error);
  }
}

export const mintDai = async (dispatch:any, amountToSpend:any, slippage:any, wenPrice:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fixedAmountToSpend = amountToSpend * 1e9;
    console.log(fixedAmountToSpend.toString());
    const maxPrice = wenPrice + ((slippage / 100) * wenPrice);
    const connectedDaiBondDepo = await daiBondDepositoryContract.connect(signer);
    const tx = await connectedDaiBondDepo.deposit(fixedAmountToSpend, maxPrice, signer.getAddress());
  } catch(error) {
    console.log(error);
  }
}

export const redeemBondsForLP = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    console.log("Error claiming, no staking")
  }
}

export const redeemBondsForDai = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedDaiBondDepo = await daiBondDepositoryContract.connect(signer);
    const tx = await connectedDaiBondDepo.redeem(signer.getAddress(), 0);
  } catch {
    console.log("Error claiming, no staking")
  }
}
