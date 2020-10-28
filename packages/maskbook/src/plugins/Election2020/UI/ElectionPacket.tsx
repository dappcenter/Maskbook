import React from 'react'
import { Card, CardContent, createStyles, makeStyles, Typography } from '@material-ui/core'
import { ElectionCard } from './ElectionCard'
import { US_PARTY_TYPE, US_STATE_TYPE } from '../types'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundImage: 'linear-gradient(180deg, #121d76 0%, #2c39b9 100%)',
        },
        content: {},
        actions: {},
        cards: {
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(2),

            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        notes: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
        },
        card: {
            padding: theme.spacing(2, 1),
            '&:first-child': {
                paddingLeft: 0,
            },
            '&:last-child': {
                paddingRight: 0,
            },
        },
        note: {},
    }),
)

export interface ElectionPacketProps {}

export function ElectionPacket(props: ElectionPacketProps) {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                    2020 Presidential Election
                </Typography>
                <div className={classes.notes}>
                    <Typography className={classes.note}>Has been collected 1/51</Typography>
                    <Typography className={classes.note}>KING</Typography>
                </div>
                <div className={classes.cards}>
                    {new Array(20).fill(0).map((_, i) => (
                        <section className={classes.card} key={i}>
                            <ElectionCard
                                size="small"
                                stateId={US_STATE_TYPE.AK}
                                tokenId={1000}
                                partyType={i % 2 === 0 ? US_PARTY_TYPE.BLUE : US_PARTY_TYPE.RED}
                            />
                        </section>
                    ))}
                </div>
                <div className={classes.notes}>
                    <Typography className={classes.note}>End date: {new Date().toLocaleDateString()}</Typography>
                    <Typography className={classes.note}>From @Mask</Typography>
                </div>
            </CardContent>
        </Card>
    )
}
