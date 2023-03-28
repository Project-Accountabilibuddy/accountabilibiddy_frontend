import useGlobalState from '../global/GlobalSate'
import GLOBAL_COPY, { CopySections } from '../global/GlobalCopy'

interface useGlobalCopyReturn {
  userChosenGlobalCopy: { [key in CopySections]: string }
}

/* eslint @typescript-eslint/consistent-indexed-object-style: ["error", "index-signature"] */
interface UserChosenGlobalCopy {
  [key: string]: unknown
}

const useGlobalCopy = (): useGlobalCopyReturn => {
  const { userChosenCopySeverity } = useGlobalState()

  const userChosenGlobalCopy: UserChosenGlobalCopy = {}

  Object.keys(GLOBAL_COPY).forEach((key): void => {
    console.log('key: ', key)
    userChosenGlobalCopy[key] = GLOBAL_COPY[key][userChosenCopySeverity]
  })

  console.log('parsedCopy: ', userChosenGlobalCopy)

  return { userChosenGlobalCopy }
}

export default useGlobalCopy
