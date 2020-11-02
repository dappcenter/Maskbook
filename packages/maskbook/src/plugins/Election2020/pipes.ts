import { CANDIDATE_TYPE, US_STATE_TYPE } from './types'

export function resolveCandidateName(candidateType: CANDIDATE_TYPE) {
    if (candidateType === CANDIDATE_TYPE.TRUMP) return 'Donald Trump'
    return 'Joe Biden'
}

export function resolveStateName(stateType: US_STATE_TYPE) {
    return stateType
}
