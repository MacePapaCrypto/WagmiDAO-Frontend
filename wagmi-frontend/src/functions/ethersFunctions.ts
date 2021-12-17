import { BigNumber, ethers } from 'ethers';
import WenABI from '../contractABIs/WenABI.json';
import sWenABI from '../contractABIs/sWenABI.json';
import wenDaiLPABI from '../contractABIs/wenDaiLPABI.json';
import daiABI from '../contractABIs/daiABI.json';
import spookyRouterABI from '../contractABIs/spookyRouterABI.json';

declare const window:any;
let provider:any = undefined;
let wenContract:any = undefined;
let sWenContract:any = undefined;
let wenStakingHelperContract:any = undefined;
let wenStakingContract:any = undefined;
let wenDaiLPContract:any = undefined;
let daiContract:any = undefined;
let spookyRouterContract:any = undefined;
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
      "0x31Ec41694f3D31A905C5eb15a35477811Cc3bC33",
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
    /*
    wenStakingHelperContract = new ethers.Contract(
      "",
      wenStakingHelperABI,
      signer
    );
    wenStakingContract = new ethers.Contract(
      "",
      wenStakingABI,
      signer
    );
    wenBondDepositoryContract = new ethers.Contract(
      "",
      wenBondDepositoryABI,
      signer
    )
    */

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
    dispatch({type: 'wenPrice', content: wenTokenPrice.toString()});
  } catch(error) {
    return console.log(error);
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

export const getBalanceOfWen = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wenBalance = await wenContract.balanceOf(signer.getAddress());
    console.log(wenBalance.toString());
    dispatch({type: "wenBalance", content:wenBalance.toString()});
  } catch {
    return console.log("Error getting wen balance");
  }
}

export const getBalanceOfsWen = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sWenBalance = await sWenContract.balanceOf(signer.getAddress());
    console.log(sWenBalance.toString());
    dispatch({type: "sWenBalance", content:sWenBalance.toString()});
  } catch {
    return console.log("Error getting sWen balance");
  }
}

export const nextRewardAmount = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting next reward amount");
  }
}

export const nextRewardYield = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting next reward yield");
  }
}

//nextRewardsYield * nbEpoch/day * 5 to derive value
export const getROI = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting ROI");
  }
}

export const getIndex = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting index");
  }
}

//staking * market price to derive TVL value
export const getStakingTVL = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting TVL");
  }
}

//APY = (1 + (APR per epoch / # of epochs per day)) ** (number of epochs per day) - 1
export const getAPY = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting APY");
  }
}

export const getBondValues = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  } catch {
    return console.log("Error getting bond values");
  }
}

//Main Contract Function Helpers
export const checkApprovedForStaking = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //second address param needs to be changed to staking contract when deployed
    const wenBalanceApproved = await wenContract.allowance(signer.getAddress(), signer.getAddress());
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
    const sWenBalanceApproved = await sWenContract.allowance(signer.getAddress(), signer.getAddress());
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
    const signer = provider.getSigner(0);
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
    const signer = provider.getSigner(0);
    const connectedDaiContract = await daiContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const approvedBalance = await connectedDaiContract.allowance(signer.getAddress(), signer.getAddress());
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

export const approveWenToStake = async (dispatch:any, amountToSpend:any) => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    try {
      const connectedWenContract = await wenContract.connect(signer);
      //Need to change spender to staking contract after deploy
      const tx = await connectedWenContract.approve(signer.getAddress(), amountToSpend);
      console.log("Changing approved state to true");
      dispatch({type: 'isWenApprovedForStaking', content: true});
    } catch {
      return console.log("error approving");
    }
}

export const approveStakedWenToUnstake = async (dispatch:any, amountToSpend:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const connectedsWenContract = await sWenContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const tx = await connectedsWenContract.approve(signer.getAddress(), amountToSpend);
    dispatch({type: 'isWenApprovedForUnstaking', content: true});
  } catch {
    return console.log("error");
  }
}

export const approveWenDaiLPToMint = async (dispatch:any, amountToSpend:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const connectedWenDaiLPContract = await wenDaiLPContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const tx = await connectedWenDaiLPContract.approve(signer.getAddress(), amountToSpend);
    dispatch({type: 'isWenDaiLPApprovedForMint', content: true});
  } catch {
    return console.log("error with LP approve");
  }
}

export const approveDaiToMint = async (dispatch:any, amountToSpend:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const connectedDaiContract = await daiContract.connect(signer);
    //Need to change spender to staking contract after deploy
    const tx = await connectedDaiContract.approve(signer.getAddress(), amountToSpend);
    dispatch({type: 'isDaiApprovedForMint', content: true});
  } catch {
    return console.log("error with Dai approve");
  }
}

export const stakeWen = async (dispatch:any, amountToStake:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const connectedStakingHelperContract = await wenStakingHelperContract.connect(signer);
    const estimateGas = await connectedStakingHelperContract.estimateGas.stake(signer.getAddress(), 
      {
        value: ethers.utils.parseEther(amountToStake)
      }
    );
    const tx = await connectedStakingHelperContract.stake(signer.getAddres(),
      {
        value: ethers.utils.parseEther(amountToStake),
        gasLimit: estimateGas
      }  
    );
    dispatch({type: 'isUserStaked', content: true});
  } catch {
    return console.log("Failed to stake");
  } 
}

export const unstakeWen = async (dispatch:any, amountToUnstake:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const connectedStakingContract = await wenStakingContract.connect(signer);
    const estimateGas = await connectedStakingContract.estimateGas.stake(1, 
      {
        value: ethers.utils.parseEther(amountToUnstake)
      }
    );
    const tx = await connectedStakingContract.stake(1,
      {
        value: ethers.utils.parseEther(amountToUnstake),
        gasLimit: estimateGas
      }  
    );
    dispatch({type: 'isUserStaked', content: false});
  } catch {
    return console.log("Failed to unstake");
  }
}

export const mintWenDaiLP = async (dispatch:any, amountToSpend:any, slippage:any) => {
  try {
    const basePrice = 0; //Figure out where to get this value from Sluia
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    const maxPrice = basePrice + ((slippage / 100) * basePrice);
  } catch {
    console.log("Error Bonding LP");
  }
}

export const mintDai = async (dispatch:any, amountToSpend:any, slippage:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
  } catch {
    console.log("Error Bonding DAI");
  }
}

export const redeemBonds = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
  } catch {
    console.log("Error claiming, no staking")
  }
}

export const redeemBondsAndStake = async (dispatch:any) => {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
  } catch {
    console.log("Error claiming, no staking")
  }
}
