import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

import useGlobalState from "../global/GlobalSate";

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  .body-2 {
    text-align: start;
  }

  .top_nav_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--top-bar-height);
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

    .future_logo {
      width: 100%;
      position: absolute;
      left: 0;
    }
  }

  .section_group {
    height: calc(100vh - var(--top-bar-height));
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

      .section_middle_top,
      .section_weekly_form_fields,
      .section_weekly_feed {
        border: 2px solid ${({ theme }) => theme.colors.secondary};
        border-radius: 4px;
        margin-bottom: 12px;
        padding: 24px;
      }

      .section_middle_top {
        .fade_in_out_texts {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      .section_weekly_form_fields {
        .section_weekly_form {
          color: ${({ theme }) => theme.colors.white};
          background-color: ${({ theme }) => theme.colors.darkGrey};
          border-radius: 4px;
          border: none;
          outline: none;
          width: 100%;
          resize: none;
        }
      }

      .section_weekly_feed {
        margin-bottom: 0;
        height: 100%;
        overflow: scroll;

        .weeks_response {
          border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
          margin-bottom: 12px;
          padding: 12px;
        }
      }
    }

    .section_right {
      margin: 12px 12px 12px 6px;
    }
  }
`;

const Project = () => {
  const [inputWeeksGoals, setInputWeeksGoals] = useState("");
  const [inputLastWeeksReview, setInputLastWeeksReview] = useState("");

  const navigate = useNavigate();

  const {
    projectName,
    userResponseWhyLongForm,
    setWeekResponseFeed,
    userResponseHattersLongForm,
    userResponseHattersShortForm,
    weekResponseFeed,
    userResponseWhyShortForm,
  } = useGlobalState();

  console.log({ userResponseHattersShortForm });

  const handleSignOut = async () => {
    try {
      await Auth.signOut().then(() => navigate("/"));
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const handleSubmitWeekReview = () => {
    setWeekResponseFeed({
      weeksGoals: inputWeeksGoals,
      lastWeeksReview: inputLastWeeksReview,
    });

    setInputLastWeeksReview("");
    setInputWeeksGoals("");
  };

  return (
    <StyledProject>
      <div className="top_nav_bar">
        <h1 className="heading-1">{projectName}</h1>
        <h1 className="heading-1 future_logo">Accountabilibuddy</h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <div className="section_group">
        <div className="section_left">
          <h3 className="body-2">{userResponseWhyLongForm}</h3>
        </div>
        <div className="section_middle">
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">7/10 Weeks Remaining</h2>
          </div>
          <div className="section_middle_top">
            <h2 className="body-1 fade_in_out_texts">
              {userResponseWhyShortForm}
            </h2>
          </div>
          <div className="section_weekly_form_fields">
            <h3 className="body-2">Last Week Review:</h3>
            <textarea
              className="section_weekly_form"
              value={inputLastWeeksReview}
              onChange={(e) => setInputLastWeeksReview(e.target.value)}
              rows={3}
            />
            <h3 className="body-2">This Weeks Goals:</h3>
            <textarea
              className="section_weekly_form"
              value={inputWeeksGoals}
              onChange={(e) => setInputWeeksGoals(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSubmitWeekReview}>Submit</Button>
          </div>
          <div className="section_weekly_feed">
            {weekResponseFeed.map(({ weeksGoals, lastWeeksReview }, i) => {
              return (
                <div key={i} className="weeks_response">
                  <h6 className="body-2">{`Current weeks goals: ${weeksGoals}`}</h6>
                  <h6 className="body-2">{`Previou weeks review: ${lastWeeksReview}`}</h6>
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
