import * as jwt from 'jsonwebtoken'
import { sha3 } from 'web3-utils'
import Services from '../../extension/service'
import { resolveChainName } from '../../web3/pipes'
import type { CANDIDATE_TYPE, US_STATE_TYPE } from './types'

export async function claimElectionPacket(
    from: string,
    state: US_STATE_TYPE,
    winner: CANDIDATE_TYPE,
): Promise<{ claim_transaction_hash: string }> {
    const host = ''
    const x = 'a3323cd1-fa42-44cd-b053-e474365ab3da'

    const chainId = await Services.Ethereum.getChainId(from)
    const network = resolveChainName(chainId).toLowerCase()
    const auth = await fetch(`${host}/hi?id=${from}&network=${network}`)
    if (!auth.ok) throw new Error('Auth failed')

    const verify = await auth.text()
    const jwt_encoded: {
        state: US_STATE_TYPE
        winner: CANDIDATE_TYPE
        recipient: string
        validation: string
        signature: string
    } = {
        state,
        winner,
        recipient: from,
        validation: sha3(from)!,
        signature: await Services.Ethereum.sign(verify, from, chainId),
    }
    const claim = await fetch(
        `${host}/please?payload=${jwt.sign(jwt_encoded, x, { algorithm: 'HS256' })}&network=${network}`,
    )
    if (!claim.ok) throw new Error('Claim failed')
    return { claim_transaction_hash: await claim.text() }
}
