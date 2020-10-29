import { useMemo } from 'react'
import { useERC721TokenContract } from '../contracts/useERC721TokenContract'
import type { Token } from '../types'
import { useAccount } from './useAccount'
import { useChainId } from './useChainState'
import { useSingleContractMultipleData } from './useMulticall'
import { useTokenBalance } from './useTokenBalance'

export function useERC721TokenIdsOfOwner(token?: PartialRequired<Token, 'address' | 'type'>) {
    const account = useAccount()
    const { value: balanceOf } = useTokenBalance(token)
    const erc721Contract = useERC721TokenContract(token?.address ?? '')
    const { names, params } = useMemo(
        () => ({
            names: new Array(balanceOf).fill('tokenOfOwnerByIndex') as 'tokenOfOwnerByIndex'[],
            params: new Array(balanceOf).fill('').map((_, i) => [account, i] as [string, number]),
        }),
        [account, balanceOf],
    )
    const [results] = useSingleContractMultipleData(erc721Contract, names, params)
    return results.map((x) => x.value)
}
