import React from 'react'
import { DialogContent, DialogProps } from '@material-ui/core'
import { InjectedDialog } from '../../../components/shared/InjectedDialog'

export interface CompositionDialogProps {
    open: boolean
    onClose: () => void
    DialogProps?: Partial<DialogProps>
}

export function CompositionDialog(props: CompositionDialogProps) {
    return (
        <InjectedDialog open={props.open} title="Composition Dialog" onExit={props.onClose}>
            <DialogContent>
                <h1>HELLO?</h1>
            </DialogContent>
        </InjectedDialog>
    )
}
