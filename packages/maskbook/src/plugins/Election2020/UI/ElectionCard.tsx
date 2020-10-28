import React from 'react'
import Tilt from 'react-tilt'
import { Card, CardActions, CardContent, createStyles, makeStyles, Typography } from '@material-ui/core'
import { US_PARTY_TYPE, US_STATE_TYPE } from '../types'
import { Image } from '../../../components/shared/Image'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            borderRadius: 4,
            position: 'relative',
        },
        content: {},
        identifier: {
            borderRadius: 4,
            display: 'block',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            left: 0,
            bottom: 0,
            position: 'absolute',
        },
    }),
)

export interface ElectionCardProps {
    size?: 'small' | 'medium'
    stateId: US_STATE_TYPE
    tokenId: number
    partyType: US_PARTY_TYPE
}

export function ElectionCard(props: ElectionCardProps) {
    const classes = useStyles(props)

    return (
        <Tilt options={{ scale: 1, max: 30, glare: true, 'max-glare': 1, speed: 1000 }}>
            <Card
                className={classes.root}
                style={{
                    width: props.size === 'small' ? 120 : 140,
                    height: props.size === 'small' ? 168 : 200,
                    backgroundImage:
                        props.partyType === US_PARTY_TYPE.BLUE
                            ? 'linear-gradient(180deg, #74B4FF 6%, #0947E5 84%)'
                            : 'linear-gradient(180deg, #D81A1A 6%, #E50909 84%)',
                }}>
                <Image
                    component="canvas"
                    width={120}
                    height={168}
                    src={
                        props.partyType === US_PARTY_TYPE.BLUE
                            ? 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Joe_Biden_official_portrait_2013.jpg'
                            : 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg'
                    }
                />
                <CardContent className={classes.content}>
                    <Typography>{props.partyType === US_PARTY_TYPE.BLUE ? 'BIDEN' : 'TRUMP'}</Typography>
                    <Typography className={classes.identifier}>{props.tokenId}</Typography>
                </CardContent>
            </Card>
        </Tilt>
    )
}
