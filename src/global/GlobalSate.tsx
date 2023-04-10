import create from 'zustand'
import dayjs from 'dayjs'

const INITIAL_STATE = {
  projectName: '',
  userResponseWhatLongForm: '',
  userResponseSacrificeLongForm: '',
  userResponseWhyLongForm: '',
  userResponseHatersLongForm: '',
  userResponseWhyShortForm: ['', '', ''],
  userResponseHatersShortForm: ['', '', ''],
  weeksExpectedToComplete: '6',
  projectStartDate: dayjs(),
  daysResponseFeed: [],
  userName: '',
  inEditFormMode: false,
  globalLoading: false
}

type DaysResponse = {
  userResponseExcelYesterday: string
  userResponseFocusYesterday: string
  dateSubmitted: dayjs.Dayjs
}

type GlobalState = {
  userResponseWhatLongForm: string
  userResponseSacrificeLongForm: string
  projectName: string
  projectStartDate: dayjs.Dayjs
  userResponseWhyLongForm: string
  userResponseWhyShortForm: string[]
  userResponseHatersLongForm: string
  userResponseHatersShortForm: string[]

  daysResponseFeed: DaysResponse[]
  setDaysResponse: (daysResponse: DaysResponse) => void
  setDaysResponseFeed: (daysResponseFeed: DaysResponse[]) => void

  setUserResponseWhatLongForm: (userResponseWhatLongForm: string) => void
  setUserResponseSacrificeLongForm: (
    userResponseSacrificeLongForm: string
  ) => void
  setProjectName: (projectName: string) => void
  setProjectStartDate: (projectStartDate: dayjs.Dayjs) => void
  setUserResponseWhyLongForm: (userResponseWhyLongForm: string) => void

  updateWhyShortFormNumberOfResponses: (removeOrAdd: 'ADD' | 'REMOVE') => void
  setUserResponseWhyShortForm: (
    userResponseWhyShortForm: string,
    index: number
  ) => void
  setAllUserResponseWhyShortForm: (responses: string[]) => void

  setUserResponseHatersLongForm: (userResponseHatersLongForm: string) => void

  updateHatersShortFormNumberOfResponses: (
    removeOrAdd: 'ADD' | 'REMOVE'
  ) => void
  setUserResponseHatersShortForm: (
    userResponseHatersShortForm: string,
    index: number
  ) => void
  setAllUserResponseHatersShortForm: (responses: string[]) => void

  weeksExpectedToComplete: string
  setWeeksExpectedToComplete: (weeksExpectedToComplete: string) => void

  // APP UI STATE
  inEditFormMode: boolean
  setInEditFormMode: (inEditFormMode: boolean) => void
  globalLoading: boolean
  setGlobalLoading: (globalLoading: boolean) => void

  // USER AUTH STATE
  setUserName: (userName: string) => void
  userName: string

  // MISCELLANEOUS
  resetGlobalState: () => void
}

const useGlobalState = create<GlobalState>((set) => ({
  ...INITIAL_STATE,

  setUserResponseWhatLongForm: (userResponseWhatLongForm) => {
    set(() => ({ userResponseWhatLongForm }))
  },

  setUserResponseSacrificeLongForm: (userResponseSacrificeLongForm) => {
    set(() => ({ userResponseSacrificeLongForm }))
  },

  setProjectName: (projectName) => {
    set(() => ({ projectName }))
  },

  setProjectStartDate: (projectStartDate) => {
    set(() => ({ projectStartDate }))
  },

  setUserResponseWhyLongForm: (userResponseWhyLongForm) => {
    set(() => ({ userResponseWhyLongForm }))
  },

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

  setAllUserResponseWhyShortForm: (responses) => {
    set(() => ({ userResponseWhyShortForm: responses }))
  },

  setUserResponseHatersLongForm: (userResponseHatersLongForm) => {
    set(() => ({ userResponseHatersLongForm }))
  },

  updateHatersShortFormNumberOfResponses: (removeOrAdd) => {
    set((state) => {
      if (removeOrAdd === 'ADD') {
        return {
          userResponseHatersShortForm: [
            ...state.userResponseHatersShortForm,
            ''
          ]
        }
      }
      if (removeOrAdd === 'REMOVE') {
        state.userResponseHatersShortForm.pop()
        return {
          userResponseHatersShortForm: state.userResponseHatersShortForm
        }
      }
      return state
    })
  },

  setUserResponseHatersShortForm: (userResponseHatersShortForm, index) => {
    set((state) => ({
      userResponseHatersShortForm: state.userResponseHatersShortForm.map(
        (item, i) => (i === index ? userResponseHatersShortForm : item),
        []
      )
    }))
  },
  setAllUserResponseHatersShortForm: (responses) => {
    set(() => ({ userResponseHatersShortForm: responses }))
  },

  setDaysResponse: (daysResponse) => {
    set((state) => ({
      daysResponseFeed: [daysResponse, ...state.daysResponseFeed]
    }))
  },
  setDaysResponseFeed: (daysResponseFeed) => {
    set(() => ({ daysResponseFeed }))
  },

  setWeeksExpectedToComplete: (weeksExpectedToComplete) => {
    set(() => ({ weeksExpectedToComplete }))
  },

  // APP UI STATE
  setInEditFormMode: (inEditFormMode) => {
    set(() => ({ inEditFormMode }))
  },

  setGlobalLoading: (globalLoading) => {
    set(() => ({ globalLoading }))
  },

  // USER AUTH STATE
  setUserName: (userName) => {
    set(() => ({ userName }))
  },

  // MISCELLANEOUS
  resetGlobalState: () => {
    set(INITIAL_STATE)
  }
}))

export default useGlobalState
