import create from 'zustand'
import dayjs from 'dayjs'

interface DaysResponse {
  userResponseExcelYesterday: string
  userResponseFocusYesterday: string
  dateSubmitted: dayjs.Dayjs
}

interface GlobalState {
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

  updateWhyShortFormNumberOfResponses: (removeOrAdd: string) => void
  setUserResponseWhyShortForm: (
    userResponseWhyShortForm: string,
    index: number
  ) => void

  setUserResponseHatersLongForm: (userResponseHatersLongForm: string) => void

  updateHatersShortFormNumberOfResponses: (removeOrAdd: string) => void
  setUserResponseHatersShortForm: (
    userResponseHatersShortForm: string,
    index: number
  ) => void

  weeksExpectedToComplete: string
  setWeeksExpectedToComplete: (weeksExpectedToComplete: string) => void

  // APP UI STATE
  inEditFormMode: boolean
  setInEditFormMode: (inEditFormMode: boolean) => void
  globalLoading: boolean
  setGlobalLoading: (globalLoading: boolean) => void
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

  projectStartDate: dayjs(),
  setProjectStartDate: (projectStartDate) => {
    set(() => ({ projectStartDate }))
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

  userResponseHatersLongForm: '',
  setUserResponseHatersLongForm: (userResponseHatersLongForm) => {
    set(() => ({ userResponseHatersLongForm }))
  },

  userResponseHatersShortForm: ['', '', ''],

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

  userResponseWeeksToAccomplish: 1,
  daysResponseFeed: [],
  setDaysResponse: (daysResponse) => {
    set((state) => ({
      daysResponseFeed: [daysResponse, ...state.daysResponseFeed]
    }))
  },
  setDaysResponseFeed: (daysResponseFeed) => {
    set(() => ({ daysResponseFeed }))
  },

  weeksExpectedToComplete: '6',
  setWeeksExpectedToComplete: (weeksExpectedToComplete) => {
    set(() => ({ weeksExpectedToComplete }))
  },

  // APP UI STATE
  inEditFormMode: false,
  setInEditFormMode: (inEditFormMode) => {
    set(() => ({ inEditFormMode }))
  },

  globalLoading: false,
  setGlobalLoading: (globalLoading) => {
    set(() => ({ globalLoading }))
  }
}))

export default useGlobalState
