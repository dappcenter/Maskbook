import { SnackbarContent } from '@material-ui/core'
import React, { Suspense } from 'react'
import MaskbookPluginWrapper from '../MaskbookPluginWrapper'
import type { PluginConfig } from '../plugin'
import { Election2020PluginID } from './constants'
import { Election2020MetadataReader } from './helpers'
import { US_PARTY_TYPE, US_STATE_TYPE } from './types'
import { ElectionCard } from './UI/ElectionCard'
import { ElectionPacket } from './UI/ElectionPacket'
import { ElectionPacketsInspector } from './UI/ElectionPacketsInspector'

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
