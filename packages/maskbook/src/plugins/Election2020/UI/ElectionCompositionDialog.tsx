import React, { useCallback, useState } from 'react'
import {
    Box,
    createStyles,
    DialogContent,
    DialogProps,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'
import { CANDIDATE_TYPE, US_STATE_TYPE, Election2020JSONPayload } from '../types'
import { getEnumAsArray } from '../../../utils/enum'
import { PortalShadowRoot } from '../../../utils/shadow-root/ShadowRootPortal'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { useChainId } from '../../../web3/hooks/useChainState'
import { EthereumNetwork, EthereumTokenType } from '../../../web3/types'
import { useAccount } from '../../../web3/hooks/useAccount'
import { resolveChainName } from '../../../web3/pipes'
import { useConstant } from '../../../web3/hooks/useConstant'
import { Election2020MetaKey, ELECTION_2020_CONSTANTS } from '../constants'
import { useToken } from '../../../web3/hooks/useToken'
import { pick } from 'lodash-es'
import { getActivatedUI } from '../../../social-network/ui'

const useStyles = makeStyles((theme) =>
    createStyles({
        control: {
            width: '100%',
            paddingBottom: theme.spacing(2),
        },
    }),
)

export interface ElectionCompositionDialogProps {
    open: boolean
    onClose: () => void
    DialogProps?: Partial<DialogProps>
}

export function ElectionCompositionDialog(props: ElectionCompositionDialogProps) {
    const classes = useStyles()

    const account = useAccount()
    const chainId = useChainId()

    // fetch the NTF token
    const ELECTION_2020_NTF_ADDRESS = useConstant(ELECTION_2020_CONSTANTS, 'ELECTION_2020_NTF_ADDRESS')
    const nftToken = useToken({
        type: EthereumTokenType.ERC721,
        address: ELECTION_2020_NTF_ADDRESS,
    })

    // payload settings
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [state, setState] = useState(US_STATE_TYPE.AK)
    const [winner, setWinner] = useState(CANDIDATE_TYPE.TRUMP)

    const onConfirm = useCallback(() => {
        if (!nftToken.value) return

        // compose payload
        const payload: Election2020JSONPayload = {
            state,
            winner,
            sender: {
                address: account,
                name,
                message,
            },
            creation_time: 0,
            network: resolveChainName(chainId) as EthereumNetwork,
            ntf_token: pick(nftToken.value, ['address', 'name', 'symbol']),
        }

        // update the composition dialog
        const ref = getActivatedUI().typedMessageMetadata
        const next = new Map(ref.value.entries())
        payload ? next.set(Election2020MetaKey, payload) : next.delete(Election2020MetaKey)
        ref.value = next

        // close the dialog
        props.onClose()
    }, [account, chainId, name, message, state, winner, nftToken, props.onClose])

    return (
        <InjectedDialog open={props.open} title="Election Composition Dialog" onExit={props.onClose}>
            <DialogContent>
                <FormControl className={classes.control}>
                    <InputLabel>Winner</InputLabel>
                    <Select
                        value={winner}
                        MenuProps={{
                            container: PortalShadowRoot,
                        }}
                        onChange={(ev) => setWinner(ev.target.value as CANDIDATE_TYPE)}>
                        {Object.values(getEnumAsArray(CANDIDATE_TYPE)).map((x) => (
                            <MenuItem key={x.value} value={x.value}>
                                {x.key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.control}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={state}
                        MenuProps={{
                            container: PortalShadowRoot,
                        }}
                        onChange={(ev) => setState(ev.target.value as US_STATE_TYPE)}>
                        {Object.values(getEnumAsArray(US_STATE_TYPE)).map((x) => (
                            <MenuItem key={x.value} value={x.value}>
                                {x.key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.control}>
                    <TextField
                        label="Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}></TextField>
                </FormControl>
                <FormControl className={classes.control}>
                    <TextField
                        label="Message (Optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}></TextField>
                </FormControl>
                <FormControl className={classes.control}>
                    <Box display="flex" justifyContent="flex-end">
                        <ActionButton variant="contained" onClick={onConfirm}>
                            Confirm
                        </ActionButton>
                    </Box>
                </FormControl>
            </DialogContent>
        </InjectedDialog>
    )
}
