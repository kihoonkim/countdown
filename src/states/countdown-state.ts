import { atom } from 'recoil'

export const countdownState = atom<boolean>({
  key: 'countdown-state',
  default: false,
})
