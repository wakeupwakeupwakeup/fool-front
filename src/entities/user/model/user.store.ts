import { atom } from 'jotai'
import { IPlayer } from '@/entities/auth'

export const playerAtom = atom<IPlayer | null>(null)
