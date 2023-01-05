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

  .body-2 {
    text-align: start;
  }

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
    height: 100%;
    display: flex;

    .section_left,
    .section_middle,
    .section_right {
      padding: 24px;
      width: 100%;
      border: 2px solid ${({ theme }) => theme.colors.secondary};
      border-radius: 4px;
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
        border: 2px solid ${({ theme }) => theme.colors.secondary};
        border-radius: 4px;
        margin-bottom: 12px;
        padding: 24px;
      }

      .section_dynamic_action {
        .fade_in_out_text {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      .section_weekly_form_fields {
        .text_field_weekly_form {
          color: ${({ theme }) => theme.colors.white};
          background-color: ${({ theme }) => theme.colors.darkGrey};
          border-radius: 4px;
          border: none;
          outline: none;
          width: 100%;
          resize: none;
        }
      }

      .section_weekly_form_feed {
        margin-bottom: 0;
        height: 100%;
        overflow: scroll;
      }
    }

    .section_right {
      margin: 12px 12px 12px 6px;
    }
  }

  .temp_crud_stuffff {
    display: flex;
    flex-direction: column;

    input {
      color: white;
    }

    button {
      margin-top: 12px;
    }
  }

  .body-2 {
    text-align: start;
    margin-bottom: 12px;
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
          <div className="section_dynamic_action">
            <h2 className="body-1 fade_in_out_text">
              Message to fade in and out to motivate you
            </h2>
          </div>
          <div className="section_weekly_form_fields">
            <h3 className="body-2">Last Week Review:</h3>
            <textarea
              className="text_field_weekly_form"
              onChange={() => {}}
              rows={3}
            />
            <h3 className="body-2">This Weeks Goals:</h3>
            <textarea
              className="text_field_weekly_form"
              onChange={() => {}}
              rows={3}
            />
          </div>
          <div className="section_weekly_form_feed">
            <div className="temp_crud_stuffff">
              <h3 className="body-2">Temp Crud Shit</h3>
              <TextField
                variant="outlined"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <Button onClick={handleCreateItem}>Create New Item</Button>
            </div>
            {allItems.map((item: Item, i) => {
              return (
                <div key={i} className="item">
                  <Button onClick={() => handleDeleteItem(item?.id)}>
                    Delete
                  </Button>
                  <h6 className="caption">{item?.name}</h6>
                </div>
              );
            })}
          </div>
        </div>
        <div className="section_right">
          <h3 className="body-2">{userResponseHattersLongForm}</h3>
        </div>
      </div>
    </StyledProject>
  );
};

export default Project;
