export const defaultState = {
    walletAddress: "",
    walletContextDetected: false,
    onFantomNetwork: false,
    isWenApprovedForStaking: false,
    isWenApprovedForUnstaking: false,
    isWenApprovedForMinting: false,
    isUserStaked: false,
    isWenDaiLPApprovedForMint: false,
    isDaiApprovedForMint: false,
    whichBond: "LP",
    slippage: 0,
    wenBalance: "",
    sWenBalance: "",
    wenPrice: 0,
    marketCap: 0,
    triggerAll: false,
    totalWenSupply: 0,
    backingPerWen: 0,
    treasuryTVL: 0,
    stakingTVL: 0,
    stakeAPY: 0,
    wenStaked: 0,
    claimableRewards: 0,
    lpBondROI: 0,
    daiBondROI: 0,
    lpBondDiscount: 0,
    daiBondDiscount: 0,
    timeLeftVested: 0,
    balanceOfLP: 0,
    index: 0,
    daiDiscount: 0,
    lpDiscount: 0,
    maxPayoutDai: 0,
    maxPayoutLP: 0,
    nextRewardYield: 0,
    nextRewardAmount: 0,
    stakeROI: 0,
    balanceOfDai: 0,
};

const formatAddress = (addressString:any) => {
  if (addressString.length === 42) {
    return addressString.substring(0,6) + "..." + addressString.substring(38,42);
  } else {
    return "";
  }
}

const Reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'walletAddress':
      return {
        ...state,
        walletAddress: action.content
      };
    case 'walletContextDetected':
      return {
        ...state,
        walletContextDetected: action.content
      }
    case 'onFantomNetwork':
      return {
        ...state,
        onFantomNetwork: action.content
      }
    case 'isWenApprovedForStaking':
      return {
        ...state,
        isWenApprovedForStaking: action.content
      }
    case 'isWenApprovedForMinting':
      return {
        ...state,
        isWenApprovedForMinting: action.content
      }
    case 'isWenApprovedForUnstaking':
      return {
        ...state,
        isWenApprovedForUnstaking: action.content
      }
    case 'isUserStaked':
      return {
        ...state,
        isUserStaked: action.content
      }
    case 'isWenDaiLPApprovedForMint':
      return {
        ...state,
        isWenDaiLPApprovedForMint: action.content
      }
      case 'isDaiApprovedForMint':
        return {
          ...state,
          isDaiApprovedForMint: action.content
        }
      case 'whichBond':
        return {
          ...state,
          whichBond: action.content
        }
      case 'slippage':
        return {
          ...state,
          slippage: action.content
        }
      case 'wenBalance':
        return {
          ...state,
          wenBalance: action.content
        }
      case 'sWenBalance':
        return {
          ...state,
          sWenBalance: action.content
        }
      case 'wenPrice':
        return {
          ...state,
          wenPrice: action.content
        }
      case 'marketCap':
        return {
          ...state,
          marketCap: action.content
        }
      case 'triggerAll':
        return {
          ...state,
          triggerAll: action.content
        }
      case 'totalWenSupply':
        return {
          ...state,
          totalWenSupply: action.content
        }
        case 'backingPerWen':
          return {
            ...state,
            backingPerWen: action.content
          }
        case 'treasuryTVL':
          return {
            ...state,
            treasuryTVL: action.content
          }
        case 'stakeAPY':
          return {
            ...state,
            stakeAPY: action.content
          }
        case 'wenStaked':
          return {
            ...state,
            wenStaked: action.content
          }
        case 'claimableRewards':
          return {
            ...state,
            claimableRewards: action.content
          }
        case 'lpBondROI':
          return {
            ...state,
            lpBondROI: action.content
          }
        case 'daiBondROI':
          return {
            ...state,
            daiBondROI: action.content
          }
        case 'timeLeftVested':
          return {
            ...state,
            timeLeftVested: action.content
          }
        case 'balanceOfLP':
          return {
            ...state,
            balanceOfLP: action.content
          }
        case 'index':
          return {
            ...state,
            index: action.content
          }
        case 'daiDiscount':
          return {
            ...state,
            daiDiscount: action.content
          }
        case 'lpDiscount':
          return {
            ...state,
            lpDiscount: action.content
          }
        case 'maxPayoutDai':
          return {
            ...state,
            maxPayoutDai: action.content
          }
        case 'maxPayoutLP':
          return {
            ...state,
            maxPayoutLP: action.content
          }
        case 'stakingTVL':
          return {
            ...state,
            stakingTVL: action.content
          }
        case 'nextRewardYield':
          return {
            ...state,
            nextRewardYield: action.content
          }
        case 'nextRewardAmount':
          return {
            ...state,
            nextRewardAmount: action.content
          }
        case 'stakeROI':
          return {
            ...state,
            stakeROI: action.content
          }
        case 'lpBondDiscount':
          return {
            ...state,
            lpBondDiscount: action.content
          }
        case 'daiBondDiscount':
          return {
            ...state,
            daiBondDiscount: action.content
          }
        case 'balanceOfDai':
          return {
            ...state,
            balanceOfDai: action.content
          }
    default:
      return state;
  }
};

export default Reducer;