import { Contract } from '../../views/Dig/components/node_modules/web3-eth-contract'

export interface Dig {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface ClaimsContext {
  claims: Dig[]
  unharvested: number
}
