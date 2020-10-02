import React from '../../../views/Claims/node_modules/react'
import styled from '../../../views/Claims/components/node_modules/styled-components'
import { useWallet } from '../../../views/Claims/node_modules/use-wallet'
import usePendingTransactions from '../../../hooks/usePendingTransactions'
import Button from '../../Button'

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet()
  const pendingTransactions = usePendingTransactions()
  return (
    <>
      {!!account && !!pendingTransactions.length ? (
        <StyledTxButton>
          <Button
            size="sm"
            text={`${pendingTransactions.length} Transaction(s)`}
            href={`https://etherscan.io/address/${account}`}
          />
        </StyledTxButton>
      ) : null}
    </>
  )
}

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`

export default TxButton
