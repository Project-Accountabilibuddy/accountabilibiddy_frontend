import create from 'zustand'

interface WeeksResponse {
  weeksGoals: string
  lastWeeksReview: string
}

interface GlobalState {
  userResponseWhatLongForm: string
  userResponseSacrificeLongForm: string
  projectName: string
  userResponseWhyLongForm: string
  userResponseWhyShortForm: string[]
  userResponseHattersLongForm: string
  userResponseHattersShortForm: string[]

  weekResponseFeed: WeeksResponse[]
  setWeekResponseFeed: (weeksResponse: WeeksResponse) => void

  setUserResponseWhatLongForm: (userResponseWhatLongForm: string) => void
  setUserResponseSacrificeLongForm: (
    userResponseSacrificeLongForm: string
  ) => void
  setProjectName: (projectName: string) => void
  setUserResponseWhyLongForm: (userResponseWhyLongForm: string) => void

  updateWhyShortFormNumberOfResponses: (removeOrAdd: string) => void
  setUserResponseWhyShortForm: (
    userResponseWhyShortForm: string,
    index: number
  ) => void

  setUserResponseHattersLongForm: (userResponseHattersLongForm: string) => void

  updateHattersShortFormNumberOfResponses: (removeOrAdd: string) => void
  setUserResponseHattersShortForm: (
    userResponseHatersShortForm: string,
    index: number
  ) => void

  weeksExpectedToComplete: number
  setWeeksExpectedToComplete: (weeksExpectedToComplete: number) => void
}

const useGlobalState = create<GlobalState>((set) => ({
  userResponseWhatLongForm: '',
  setUserResponseWhatLongForm: (userResponseWhatLongForm) => { set(() => ({ userResponseWhatLongForm })) },

  userResponseSacrificeLongForm: '',
  setUserResponseSacrificeLongForm: (userResponseSacrificeLongForm) => { set(() => ({ userResponseSacrificeLongForm })) },

  projectName: 'Salsa Champ',
  setProjectName: (projectName) => { set(() => ({ projectName })) },

  userResponseWhyLongForm:
    "Mereth loose speed splendor strongest trust? Giving Dragon-Slayer cheekbones thirsty tracking nightshade? Ensnare liable shaken beg approaching sooner invitations Gandalf went. Watchtower Dunland secretive reason. These barley months employment touch Morgul-rats available manner. Gandalf the Grey inform defeat fortune tradition half-wits advance. Andûril amazing amongst. Twitching Orcrist starve struggle small anchored toy-makers woodlands. Angmar sponge launching sometimes charge! There and Back Again. A Hobbit's Tale.",
  setUserResponseWhyLongForm: (userResponseWhyLongForm) => { set(() => ({ userResponseWhyLongForm })) },

  userResponseWhyShortForm: ['DEPLOY COMMAND IS SOLID BOIII', '', ''],

  updateWhyShortFormNumberOfResponses: (removeOrAdd) => {
    set((state) => {
      if (removeOrAdd === 'ADD') {
        return {
          userResponseWhyShortForm: [...state.userResponseWhyShortForm, '']
        }
      }
      if (removeOrAdd === 'REMOVE') {
        state.userResponseWhyShortForm.pop()
        return {
          userResponseWhyShortForm: state.userResponseWhyShortForm
        }
      }
      return state
    })
  },

  setUserResponseWhyShortForm: (userResponseWhyShortForm, index) => {
    set((state) => ({
      userResponseWhyShortForm: state.userResponseWhyShortForm.map(
        (item, i) => (i === index ? userResponseWhyShortForm : item),
        []
      )
    }))
  },

  userResponseHattersLongForm:
    "Remarked Isen getting 21 handle probably. Troublemaker cowards Prancing Pony? Counts token funny Celeborn ambushed smithy's pot farmer? Outscoring Azog stop withdraw grumpy you've finish. Gandalf's death was not in vain. Nor would he have you give up hope. Dampens Elven spreads listened bidden. Disturbing while crooked tinkers badly any hearts Arwen's lessened! Kingdoms Númenor l rock wrong prize tomatoes riding or niece kingly gifted?",
  setUserResponseHattersLongForm: (userResponseHattersLongForm) => { set(() => ({ userResponseHattersLongForm })) },

  userResponseHattersShortForm: ['A', 'B', 'C'],

  updateHattersShortFormNumberOfResponses: (removeOrAdd) => {
    set((state) => {
      if (removeOrAdd === 'ADD') {
        return {
          userResponseHattersShortForm: [
            ...state.userResponseHattersShortForm,
            ''
          ]
        }
      }
      if (removeOrAdd === 'REMOVE') {
        state.userResponseHattersShortForm.pop()
        return {
          userResponseHattersShortForm: state.userResponseHattersShortForm
        }
      }
      return state
    })
  },

  setUserResponseHattersShortForm: (userResponseHattersShortForm, index) => {
    set((state) => ({
      userResponseHattersShortForm: state.userResponseHattersShortForm.map(
        (item, i) => (i === index ? userResponseHattersShortForm : item),
        []
      )
    }))
  },

  userResponseWeeksToAccomplish: 1,
  weekResponseFeed: [],
  setWeekResponseFeed: (weeksResponse) => {
    set((state) => ({
      weekResponseFeed: [...state.weekResponseFeed, weeksResponse]
    }))
  },

  weeksExpectedToComplete: 6,
  setWeeksExpectedToComplete: (weeksExpectedToComplete) => { set(() => ({ weeksExpectedToComplete })) }
}))

export default useGlobalState
