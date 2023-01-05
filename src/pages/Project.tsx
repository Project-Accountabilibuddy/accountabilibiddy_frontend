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
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

    .future_logo {
      width: 100%;
      position: absolute;
      left: 0;
    }
  }

  .three_sections {
    display: flex;
    height: 100%;

    .section_left,
    .section_middle,
    .section_right {
      padding: 24px;
      width: 100%;
      border: 2px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 8px;
    }

    .section_left,
    .section_right {
      width: 50%;
    }

    .section_left {
      margin: 12px 6px 12px 12px;
    }

    .section_middle {
      display: flex;
      flex-direction: column;

      margin: 12px 6px 12px 6px;
      border: none;
      padding: 0;

      .section_dynamic_action,
      .section_weekly_form_fields,
      .section_weekly_form_feed {
        width: 100%;
        border: 2px solid ${({ theme }) => theme.colors.secondary};
        border-radius: 8px;
        margin-bottom: 12px;
      }

      .section_dynamic_action {
        height: 80px;
      }

      .section_weekly_form_fields {
        height: 200px;
      }

      .section_weekly_form_feed {
        height: 100%;
        margin-bottom: 0;
      }
    }

    .section_right {
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
        <div className="section_left">
          <h3 className="body-2">{userResponseWhyLongForm}</h3>
        </div>
        <div className="section_middle">
          <div className="section_dynamic_action" />
          <div className="section_weekly_form_fields" />
          <div className="section_weekly_form_feed" />
        </div>
        <div className="section_right">
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
