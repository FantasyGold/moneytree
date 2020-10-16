import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMoneyTreeAddress = (blng) => {
  return blng && blng.moneyTreeAddress
}
export const getBlngAddress = (blng) => {
  return blng && blng.blngAddress
}
export const getWethContract = (blng) => {
  return blng && blng.contracts && blng.contracts.weth
}

export const getMoneyTreeContract = (blng) => {
  return blng && blng.contracts && blng.contracts.moneyTree
}
export const getBlngContract = (blng) => {
  return blng && blng.contracts && blng.contracts.blng
}

export const getXBlngStakingContract = (blng) => {
  return blng && blng.contracts && blng.contracts.xBlngStaking
}

export const getFarms = (blng) => {
  return blng
    ? blng.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'blng',
          earnTokenAddress: blng.contracts.blng.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (moneyTreeContract, pid) => {
  const { allocPoint } = await moneyTreeContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await moneyTreeContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (moneyTreeContract, pid, account) => {
  return moneyTreeContract.methods.pendingBlng(pid, account).call()
}

export const getTotalLPWethValue = async (
  moneyTreeContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that moneyTreeContract owns
  const balance = await lpContract.methods
    .balanceOf(moneyTreeContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(moneyTreeContract, pid),
  }
}

export const approve = async (lpContract, moneyTreeContract, account) => {
  return lpContract.methods
    .approve(moneyTreeContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getBlngSupply = async (blng) => {
  return new BigNumber(await blng.contracts.blng.methods.totalSupply().call())
}

export const getXBlngSupply = async (blng) => {
  return new BigNumber(await blng.contracts.xBlngStaking.methods.totalSupply().call())
}

export const stake = async (moneyTreeContract, pid, amount, account) => {
  return moneyTreeContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (moneyTreeContract, pid, amount, account) => {
  return moneyTreeContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (moneyTreeContract, pid, account) => {
  return moneyTreeContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (moneyTreeContract, pid, account) => {
  try {
    const { amount } = await moneyTreeContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (moneyTreeContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return moneyTreeContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
