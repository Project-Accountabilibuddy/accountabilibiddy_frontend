import useGlobalState from '../global/GlobalSate'
import GLOBAL_COPY from '../global/GlobalCopy'

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface UserChosenGlobalCopy {
  [key: string]: string
}
interface useGlobalCopyReturn {
  userChosenGlobalCopy: UserChosenGlobalCopy
}

const useGlobalCopy = (): useGlobalCopyReturn => {
  const { userChosenCopySeverity } = useGlobalState()

  const userChosenGlobalCopy: UserChosenGlobalCopy = {}

  const copySections = Object.keys(GLOBAL_COPY)

  copySections.forEach((key): void => {
    userChosenGlobalCopy[key] = GLOBAL_COPY[key][userChosenCopySeverity]
  })

  return { userChosenGlobalCopy }
}

export default useGlobalCopy
