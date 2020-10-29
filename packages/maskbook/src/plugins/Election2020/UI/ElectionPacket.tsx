import React from 'react'
import { Card, CardContent, CardHeader, createStyles, Link, makeStyles, Typography } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import classNames from 'classnames'
import { ElectionCard } from './ElectionCard'
import { US_PARTY_TYPE, US_STATE_TYPE } from '../types'
import FlagImage from '../assets/flag.png'
import FireworksImage from '../assets/fireworks.png'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundImage: 'linear-gradient(180deg, #121d76 0%, #2c39b9 100%)',
            position: 'relative',

            '&::before, &::after': {
                content: '""',
                width: '90%',
                height: 260,
                backgroundImage: `url(${FlagImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',

                bottom: '-21%',
                position: 'absolute',
                zIndex: 0,
            },
            '&::before': {
                left: '-12%',
            },
            '&::after': {
                right: '-12%',
                transform: 'scaleX(-1)',
            },
        },
        header: {
            zIndex: 0,
            position: 'relative',
            padding: 0,

            '&::before': {
                content: '""',
                width: '100%',
                height: 260,
                backgroundImage: `url(${FireworksImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                top: 0,
                left: 0,
                position: 'absolute',
                zIndex: 0,
            },
        },
        content: {
            zIndex: 1,
            position: 'relative',
            paddingBottom: `${theme.spacing(2)}px !important`,
        },
        actions: {},
        cards: {
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing(3),

            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        notes: {
            fontSize: 12,
            fontWeight: 500,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '24px !important',
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
        note: {
            fontSize: 'inherit',
            textShadow: [
                '-1px 0 0 #121d76',
                '1px 0 0 #121d76',
                '0 -1px 0 #121d76',
                '0 1px 0 #121d76',
                '-1px -1px 0 #121d76',
                '1px -1px 0 #121d76',
                '-1px 1px 0 #121d76',
                '1px 1px 0 #121d76',
            ].join(','),
        },
        link: {
            display: 'flex',
            alignItems: 'center',
        },
    }),
)

export interface ElectionPacketProps {}

export function ElectionPacket(props: ElectionPacketProps) {
    const classes = useStyles()
    return (
        <Card className={classes.root} elevation={0}>
            <CardHeader className={classes.header}></CardHeader>
            <CardContent className={classes.content}>
                <Typography
                    className={classNames(classes.title, classes.note)}
                    gutterBottom
                    variant="h5"
                    component="h2">
                    2020 Presidential Election
                </Typography>
                <div className={classes.notes}>
                    <Typography className={classes.note}>Has been collected 1/51</Typography>
                    <Typography className={classes.note}>
                        <Link
                            className={classes.link}
                            color="textPrimary"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://mask.io">
                            <span>KING</span>
                            <OpenInNewIcon fontSize="inherit" />
                        </Link>
                    </Typography>
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
