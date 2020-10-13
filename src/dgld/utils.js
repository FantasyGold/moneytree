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

export const getMiningManagerAddress = (dgld) => {
  return dgld && dgld.miningManagerAddress
}
export const getDgldAddress = (dgld) => {
  return dgld && dgld.dgldAddress
}
export const getWethContract = (dgld) => {
  return dgld && dgld.contracts && dgld.contracts.weth
}

export const getMiningManagerContract = (dgld) => {
  return dgld && dgld.contracts && dgld.contracts.miningManager
}
export const getDgldContract = (dgld) => {
  return dgld && dgld.contracts && dgld.contracts.dgld
}

export const getXDgldStakingContract = (dgld) => {
  return dgld && dgld.contracts && dgld.contracts.xDgldStaking
}

export const getFarms = (dgld) => {
  return dgld
    ? dgld.contracts.pools.map(
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
          earnToken: 'dgld',
          earnTokenAddress: dgld.contracts.dgld.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (miningManagerContract, pid) => {
  const { allocPoint } = await miningManagerContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await miningManagerContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (miningManagerContract, pid, account) => {
  return miningManagerContract.methods.pendingDgld(pid, account).call()
}

export const getTotalLPWethValue = async (
  miningManagerContract,
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
  // Get the share of lpContract that miningManagerContract owns
  const balance = await lpContract.methods
    .balanceOf(miningManagerContract.options.address)
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
    poolWeight: await getPoolWeight(miningManagerContract, pid),
  }
}

export const approve = async (lpContract, miningManagerContract, account) => {
  return lpContract.methods
    .approve(miningManagerContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getDgldSupply = async (dgld) => {
  return new BigNumber(await dgld.contracts.dgld.methods.totalSupply().call())
}

export const getXDgldSupply = async (dgld) => {
  return new BigNumber(await dgld.contracts.xDgldStaking.methods.totalSupply().call())
}

export const stake = async (miningManagerContract, pid, amount, account) => {
  return miningManagerContract.methods
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

export const unstake = async (miningManagerContract, pid, amount, account) => {
  return miningManagerContract.methods
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
export const harvest = async (miningManagerContract, pid, account) => {
  return miningManagerContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (miningManagerContract, pid, account) => {
  try {
    const { amount } = await miningManagerContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (miningManagerContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return miningManagerContract.methods
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
