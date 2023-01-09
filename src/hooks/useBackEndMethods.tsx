import { useState, useEffect } from 'react'
import axios from 'axios'

const buildRandomID = (length: number): string => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const useBackEndMethods = (): {
  getAllItems: () => void
  handleDeleteItem: (id: string) => void
  handleCreateItem: () => void
  setNewItemName: (newItemName: string) => void
  allItems: any[]
  newItemName: string
} => {
  const [allItems, setAllItems] = useState([])
  const [newItemName, setNewItemName] = useState('')

  useEffect(() => {
    if (allItems.length > 0) return

    getAllItems()
  }, [allItems])

  const getAllItems = (): void => {
    axios
      .get('https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items')
      .then((res) => {
        console.log(res?.data?.Items)
        setAllItems(res?.data?.Items)
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  const handleDeleteItem = (id: string): void => {
    axios
      .delete(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${id}`
      )
      .then((res) => {
        console.log(res)
        getAllItems()
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  const handleCreateItem = (): void => {
    axios
      .put('https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items', {
        id: buildRandomID(5),
        name: newItemName
      })
      .then((res) => {
        console.log(res)
        getAllItems()
        setNewItemName('')
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  return {
    getAllItems,
    handleDeleteItem,
    handleCreateItem,
    setNewItemName,
    allItems,
    newItemName
  }
}

export default useBackEndMethods
