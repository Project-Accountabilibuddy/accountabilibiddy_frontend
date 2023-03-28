import useGlobalState from '../global/GlobalSate'
import GLOBAL_COPY, { CopySections } from '../global/GlobalCopy'

type UserChosenGlobalCopy = {
  [key in CopySections]: string
}
interface useGlobalCopyReturn {
  userChosenGlobalCopy: UserChosenGlobalCopy
}

const useGlobalCopy = (): useGlobalCopyReturn => {
  const { userChosenCopySeverity } = useGlobalState()

  const userChosenGlobalCopy: UserChosenGlobalCopy = {
    LANDING_TITLE: '',
    LANDING_PARAGRAPH: ''
  }

  const copySections = Object.keys(GLOBAL_COPY) as CopySections[]

  copySections.forEach((key): void => {
    userChosenGlobalCopy[key] = GLOBAL_COPY[key][userChosenCopySeverity]
  })

  return { userChosenGlobalCopy }
}

export default useGlobalCopy
