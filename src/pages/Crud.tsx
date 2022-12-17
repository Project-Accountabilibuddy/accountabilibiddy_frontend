import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

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

type Item = {
  id: string;
  name: string;
};

const StyledCrud = styled.div`
  .create_components {
    display: flex;
    flex-direction: column;

    input {
      color: white;
    }

    button {
      margin-top: 12px;
    }
  }

  .items_title {
    text-align: start;
  }

  .item {
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    align-items: center;

    h6 {
      margin: 0;
    }
  }
`;

const Crud = () => {
  const [allItems, setAllItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  const getAllItems = () => {
    axios
      .get("https://euzdgtnwai.execute-api.us-east-1.amazonaws.com/items")
      .then((res) => {
        console.log(res?.data?.Items);
        setAllItems(res?.data?.Items);
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    getAllItems();
  }, []);

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

  // TODO: BUILD OUT SHORT AND SWEET CRUD Crud HERE
  // API GATEWAY ~ LAMBDA ~ DYNAMODB
  return (
    <StyledCrud>
      <h1>AWS CRUD</h1>
      <h6>S3 ~ Lambda ~ API Gateway ~ DynamoDB ~ Cloud Watch ~ Cloud Front</h6>
      <div className="create_components">
        <TextField
          variant="outlined"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <Button onClick={handleCreateItem}>Create New Item</Button>
      </div>
      <h3 className="items_title">Your Items:</h3>
      {allItems.map((item: Item, i) => {
        return (
          <div key={i} className="item">
            <Button onClick={() => handleDeleteItem(item?.id)}>Delete</Button>
            <h6>{item?.name}</h6>
          </div>
        );
      })}
    </StyledCrud>
  );
};

export default Crud;
