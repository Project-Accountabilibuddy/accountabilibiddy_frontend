import { useState, useEffect } from "react";
import axios from "axios";

const buildRandomID = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const useBackEndMethods = () => {
  const [allItems, setAllItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    if (allItems.length) return;

    getAllItems();
  }, [allItems]);

  const getAllItems = () => {
    axios
      .get("https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items")
      .then((res) => {
        console.log(res?.data?.Items);
        setAllItems(res?.data?.Items);
      })
      .catch((err) => console.log({ err }));
  };

  const handleDeleteItem = (id: string) => {
    axios
      .delete(
        `https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items/${id}`
      )
      .then((res) => {
        console.log(res);
        getAllItems();
      })
      .catch((err) => console.log({ err }));
  };

  const handleCreateItem = () => {
    axios
      .put(`https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items`, {
        id: buildRandomID(5),
        name: newItemName,
      })
      .then((res) => {
        console.log(res);
        getAllItems();
        setNewItemName("");
      })
      .catch((err) => console.log({ err }));
  };

  return {
    getAllItems,
    handleDeleteItem,
    handleCreateItem,
    setNewItemName,
    allItems,
  };
};

export default useBackEndMethods;
