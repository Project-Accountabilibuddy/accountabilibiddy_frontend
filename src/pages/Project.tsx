import React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import useGlobalState from "../global/GlobalSate";
import useBackEndMethods from "../hooks/useBackEndMethods";

type Item = {
  id: string;
  name: string;
};

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;

  .top_nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }

  .weekly_input_form {
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

const Project = () => {
  const {
    handleDeleteItem,
    handleCreateItem,
    setNewItemName,
    allItems,
    newItemName,
  } = useBackEndMethods();

  const navigate = useNavigate();

  const {
    userResponseWhatLongForm,
    userResponseSacrificeLongForm,
    projectName,
    userResponseWhyLongForm,
    userResponseHattersLongForm,
  } = useGlobalState();

  const handleSignOut = async () => {
    try {
      await Auth.signOut().then(() => navigate("/"));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <StyledProject>
      <div className="top_nav_bar">
        <h1 className="heading-1">{projectName}</h1>
        <h1 className="heading-1">Accountabilibuddy</h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <div className="weekly_input_form">
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
    </StyledProject>
  );
};

export default Project;
