import { ChainId } from '../../web3/types'

export const Election2020MetaKey = 'com.maskbook.election2020:1'
export const Election2020PluginID = 'com.maskbook.election2020'

export const ELECTION_2020_CONSTANTS = {
    ELECTION_2020_NTF_ADDRESS: {
        [ChainId.Mainnet]: '',
        [ChainId.Ropsten]: '',
        [ChainId.Rinkeby]: '0x48adac7d1c7ead477d98fb5ada0d32624d2c7c9e',
        [ChainId.Kovan]: '',
    },
}
