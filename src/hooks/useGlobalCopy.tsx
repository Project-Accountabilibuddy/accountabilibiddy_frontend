import { useState, useEffect } from 'react'

import useGlobalState from '../global/GlobalSate'
import GLOBAL_COPY from '../global/GlobalCopy'

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface UserChosenGlobalCopy {
  [key: string]: string
}
interface useGlobalCopyReturn {
  userChosenGlobalCopy: UserChosenGlobalCopy
}

// TODO: SHOULD ELIVATE THIS HOOK TO ONLY BE CALLED ONCE AT APP LEVEL
const useGlobalCopy = (): useGlobalCopyReturn => {
  const [userChosenGlobalCopy, setUserChosenGlobalCopy] =
    useState<UserChosenGlobalCopy>({})

  const { userChosenCopySeverity } = useGlobalState()

  useEffect(() => {
    const buildChosenGlobalCopy: UserChosenGlobalCopy = {}

    const copySections = Object.keys(GLOBAL_COPY)

    copySections.forEach((key): void => {
      buildChosenGlobalCopy[key] = GLOBAL_COPY[key][userChosenCopySeverity]
    })

    setUserChosenGlobalCopy(buildChosenGlobalCopy)
  }, [userChosenCopySeverity, setUserChosenGlobalCopy])

  return { userChosenGlobalCopy }
}

export default useGlobalCopy
