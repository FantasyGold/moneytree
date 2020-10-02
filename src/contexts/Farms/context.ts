import { createContext } from '../../views/Claims/node_modules/react'
import { ClaimsContext } from './types'

const context = createContext<ClaimsContext>({
  claims: [],
  unharvested: 0,
})

export default context
