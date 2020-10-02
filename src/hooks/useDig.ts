import { useContext } from '../views/Claims/node_modules/react'
import { Context as ClaimsContext, Dig } from '../contexts/Claims'

const useDig = (id: string): Dig => {
  const { claims } = useContext(ClaimsContext)
  const dig = claims.find((dig) => dig.id === id)
  return dig
}

export default useDig
