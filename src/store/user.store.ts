import { atom } from 'jotai'

import { IPlayer } from '@/shared/types/auth.interface'

export const playerAtom = atom<IPlayer | null>(null)
