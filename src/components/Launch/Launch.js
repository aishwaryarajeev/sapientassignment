import React from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as CONSTANTS from "../../constants";

const useStyles = makeStyles({
  root: {
    margin: "5px",
    width: "210px",
    height: "auto",
    "@media (min-width: 701px) and (max-width: 1024px) ": {
      flex: "0 0 33%",
      margin: "2% 5%",
    },
    "@media (min-width: 1025px) and (max-width: 1440px) ": {
      flex: "0 0 20%",
      margin: "2%",
    },
  },
  img: {
    backgroundColor: "#e6e6e6",
  },
  missionID: {
    fontWeight: 600,
    fontSize: "14px",
  },
  values: {
    margin: 0,
    fontSize: "13px",
    color: "#002b80",
    padding: "0px 8px",
  },
  heading: {
    marginBottom: "8px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#002b80",
  },
  listItems: {
    marginLeft: "25px",
  },
});

export const Launch = ({ mission }) => {
  const {
    flight_number,
    mission_name,
    launch_year,
    launch_success,
    mission_id,
    links,
    rocket,
  } = mission;
  let { land_success } = rocket.first_stage.cores[0];
  const classes = useStyles();
  const renderValues = (title) => {
    switch (title) {
      case CONSTANTS.CARD_TITLES[1]:
        return launch_year;
      case CONSTANTS.CARD_TITLES[2]:
        return launch_success !== null ? launch_success.toString() : "NA";
      case CONSTANTS.CARD_TITLES[3]:
        return land_success !== null ? land_success.toString() : "NA";
      default:
        return;
    }
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.img}>
          <img src={links.mission_patch_small} alt="mission" width="100%" />
        </Typography>
        <Typography className={classes.heading}>
          {mission_name}#{flight_number}
        </Typography>
        <Typography>
          {CONSTANTS.CARD_TITLES.map((title, index) => {
            return (
              <div>
                <span key={index} className={classes.missionID}>
                  {title}:
                </span>
                {index === 0 ? (
                  <div>
                    {mission_id.length > 0 ? (
                      mission_id.map((id) => {
                        return (
                          <ul key={id} className={classes.values}>
                            <li className={classes.listItems} key={id}>
                              {id}
                            </li>
                          </ul>
                        );
                      })
                    ) : (
                      <span className={classes.values}>
                        No mission id found
                      </span>
                    )}
                  </div>
                ) : (
                  <span className={classes.values}>{renderValues(title)}</span>
                )}
              </div>
            );
          })}
        </Typography>{" "}
      </CardContent>
    </Card>
  );
};
