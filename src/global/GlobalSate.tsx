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

  weeksExpectedToComplete: string
  setWeeksExpectedToComplete: (weeksExpectedToComplete: string) => void
}

const useGlobalState = create<GlobalState>((set) => ({
  userResponseWhatLongForm: '',
  setUserResponseWhatLongForm: (userResponseWhatLongForm) => {
    set(() => ({ userResponseWhatLongForm }))
  },

  userResponseSacrificeLongForm: '',
  setUserResponseSacrificeLongForm: (userResponseSacrificeLongForm) => {
    set(() => ({ userResponseSacrificeLongForm }))
  },

  projectName: '',
  setProjectName: (projectName) => {
    set(() => ({ projectName }))
  },

  userResponseWhyLongForm: '',
  setUserResponseWhyLongForm: (userResponseWhyLongForm) => {
    set(() => ({ userResponseWhyLongForm }))
  },

  userResponseWhyShortForm: ['', '', ''],

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

  userResponseHattersLongForm: '',
  setUserResponseHattersLongForm: (userResponseHattersLongForm) => {
    set(() => ({ userResponseHattersLongForm }))
  },

  userResponseHattersShortForm: ['', '', ''],

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

  weeksExpectedToComplete: '6',
  setWeeksExpectedToComplete: (weeksExpectedToComplete) => {
    set(() => ({ weeksExpectedToComplete }))
  }
}))

export default useGlobalState
