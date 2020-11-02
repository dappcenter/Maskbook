import { SnackbarContent } from '@material-ui/core'
import React, { Suspense } from 'react'
import MaskbookPluginWrapper from '../MaskbookPluginWrapper'
import type { PluginConfig } from '../plugin'
import { Election2020MetaKey, Election2020PluginID } from './constants'
import { Election2020MetadataReader } from './helpers'
import type { Election2020JSONPayload, US_PARTY_TYPE, US_STATE_TYPE } from './types'
import { createCompositionDialog } from '../utils/createCompositionDialog'
import { ElectionCard } from './UI/ElectionCard'
import { ElectionPacket } from './UI/ElectionPacket'
import { ElectionPacketsInspector } from './UI/ElectionPacketsInspector'
import { ElectionCompositionDialog } from './UI/ElectionCompositionDialog'
import { resolveStateName, resolveCandidateName } from './pipes'

const [ElectionCompositionEntry, ElectionCompositionUI] = createCompositionDialog('🎫  Election', (props) => (
    <ElectionCompositionDialog {...props} />
))

export const Election2020PluginDefine: PluginConfig = {
    pluginName: 'Election 2020',
    identifier: Election2020PluginID,
    successDecryptionInspector: function Comp(props) {
        console.log('DEBUG: successDecryptionInspector')
        console.log(props)

        // if (!Election2020MetadataReader(props.message.meta).ok) return null
        // return <ElectionPacketsInspector {...props} />

        return <Renderer />
    },
    postDialogMetadataBadge: new Map([
        [
            Election2020MetaKey,
            (payload: Election2020JSONPayload) => {
                return `A Election Packet of ${resolveStateName(payload.state)} and ${resolveCandidateName(
                    payload.winner,
                )} is the winner.`
            },
        ],
    ]),
    PageComponent: ElectionCompositionUI,
    postDialogEntries: [ElectionCompositionEntry],
}

function Renderer() {
    return (
        <MaskbookPluginWrapper pluginName="NFT Packet">
            <Suspense fallback={<SnackbarContent message="Maskbook is loading this plugin..." />}>
                <ElectionPacket />
            </Suspense>
        </MaskbookPluginWrapper>
    )
}
