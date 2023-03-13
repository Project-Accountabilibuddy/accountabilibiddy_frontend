import useGlobalState from '../global/GlobalSate'
import GLOBAL_COPY from '../global/GlobalCopy'

interface useGlobalCopyReturn {
  userChosenGlobalCopy: {}
}

const useGlobalCopy = (): useGlobalCopyReturn => {
  const { userChosenCopySeverity } = useGlobalState()

  const userChosenGlobalCopy = {}

  Object.keys(GLOBAL_COPY).forEach((key) => {
    userChosenGlobalCopy[key] = GLOBAL_COPY[key][userChosenCopySeverity]
  })

  console.log('parsedCopy: ', userChosenGlobalCopy)

  return { userChosenGlobalCopy }
}

export default useGlobalCopy
