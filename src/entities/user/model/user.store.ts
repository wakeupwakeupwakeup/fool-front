import { atom } from 'jotai'
import { IUser } from '@/entities/auth'

export const playerAtom = atom<IUser | null>(null)
