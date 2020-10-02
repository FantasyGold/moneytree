import { createContext } from '../../views/Claims/node_modules/react'
import { Transaction, TransactionsMap } from './types'

interface TransactionsContext {
  transactions: TransactionsMap
  onAddTransaction: (tx: Transaction) => void
}

export default createContext<TransactionsContext>({
  transactions: {},
  onAddTransaction: (tx: Transaction) => {},
})
