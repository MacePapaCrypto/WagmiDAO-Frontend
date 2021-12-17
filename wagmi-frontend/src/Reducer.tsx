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
    wenPrice: "",
    marketCap: "",
    triggerAll: false,
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
    default:
      return state;
  }
};

export default Reducer;