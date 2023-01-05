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
  height: 100%;

  .top_nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.lightGrey};

    .future_logo {
      width: 100%;
      position: absolute;
      left: 0;
    }
  }

  .three_sections {
    display: flex;
    height: 100%;

    .section_one,
    .section_two,
    .section_three {
      padding: 24px;
      width: 100%;
      border: 2px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 8px;
    }

    .section_one,
    .section_three {
      width: 50%;
    }

    .section_one {
      margin: 12px 6px 12px 12px;
    }

    .section_two {
      margin: 12px 6px 12px 6px;
    }

    .section_three {
      margin: 12px 12px 12px 6px;
    }
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
        <h1 className="heading-1 future_logo">Accountabilibuddy</h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <div className="three_sections">
        <div className="section_one">
          <h3 className="body-2">{userResponseWhyLongForm}</h3>
        </div>
        <div className="section_two"></div>
        <div className="section_three">
          <h3 className="body-2">{userResponseHattersLongForm}</h3>
        </div>
      </div>
      {/* <div className="weekly_input_form">
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
      })} */}
    </StyledProject>
  );
};

export default Project;
