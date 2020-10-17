import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

interface DisclaimerModal extends ModalProps {
  onConfirm: () => void
}

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: 25%;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

const DisclaimerModal: React.FC<DisclaimerModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const modalContent = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <div>
          <p> Welcome to the initial launch of Bling Finance, the MoneyTree the BlingSwap
          Exchange! The first step for FantasyGold Core in the Defi Space.
          </p>
          <p> BlingSwap is a fork of Uniswap that will be ported to the FantasyGold
          Core Blockchain. In FantasyGold Blockchain, transactions fee will be paid in FantasyGold,
          so need to worry about high gas price. Development will be on going.
          </p>
          <p> FantasyGold supports Ethereum Virtual Machine based smart contracts and
          is secured by a proof of stake consensus model. An on-chain layer allows the
          EVM to communicate with FantasyGold's Bitcoin-like UTXO blockchain.
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <StyledLink target="_blank" href="https://discord.gg/xXtgPPW">
            Click here to join the FGC Discord.
          </StyledLink>
        </div>
      )
    }
  }, [step])

  const button = useMemo(() => {
    if (step === 'disclaimer') {
      return (
        <Button
          text="Next"
          variant="secondary"
          onClick={() => setStep('uniswap')}
        />
      )
    } else {
      return <Button text="Continue To MoneyTree" onClick={handleConfirm} />
    }
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={`Announcement`} />
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default DisclaimerModal
