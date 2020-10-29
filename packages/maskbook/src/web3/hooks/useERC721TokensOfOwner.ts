import { useAsync } from 'react-use'
import { useERC721TokenContract } from '../contracts/useERC721TokenContract'
import { EthereumTokenType, Token } from '../types'
import { useAccount } from './useAccount'
import { useChainId } from './useChainState'
import { useTokenBalance } from './useTokenBalance'

export function useERC721TokensOfOwner(token?: PartialRequired<Token, 'address' | 'type'>) {
    const chainId = useChainId()
    const account = useAccount()
    const { value: balanceOf } = useTokenBalance(token)
    const erc721Contract = useERC721TokenContract(token?.address ?? '')

    const calls = [] as string[]

    return useAsync(async () => {
        if (!account) return
        if (!token?.address) return
        if (token.type !== EthereumTokenType.ERC721) return
        if (!erc721Contract) return
        if (balanceOf === '0') return
    }, [account, chainId /* re-calc when switch the chain */, token, balanceOf, erc721Contract])
}
