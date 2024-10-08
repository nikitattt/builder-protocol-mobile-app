import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'

export enum IntroStage {
  NOT_STARTED = 'not_started',
  AUCTIONS = 'auctions',
  WIDGETS = 'widgets',
  ADD_DAOS = 'add_daos',
  DONE = 'done'
}

export enum IntroNextAction {
  ADD_WALLET = 'add_wallet',
  SEARCH_DAO = 'search_dao',
  NONE = 'none'
}

interface IntroState {
  stage: IntroStage
  nextAction?: IntroNextAction
  widgetsInstructionsModalSeen: boolean
  setState: (stage: IntroStage) => void
  setNextAction: (action: IntroNextAction) => void
  setWidgetsInstructionsModalSeen: (seen: boolean) => void
}

export const useIntroStore = create<IntroState>()(
  persist(
    (set, get) => ({
      stage: IntroStage.NOT_STARTED,
      nextAction: undefined,
      widgetsInstructionsModalSeen: false,
      setState: (stage: IntroStage) => set({ stage: stage }),
      setNextAction: (action: IntroNextAction) => set({ nextAction: action }),
      setWidgetsInstructionsModalSeen: (seen: boolean) =>
        set({ widgetsInstructionsModalSeen: seen })
    }),
    {
      name: 'intro',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
