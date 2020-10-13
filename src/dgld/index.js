import BigNumber from 'bignumber.js/bignumber'
import Web3 from 'web3'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export { Dgld } from './Dgld.js'
export { Web3, BigNumber }
