import React, { useEffect, useState } from "react";
import Launch from "../Launch";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  loader: {
    display: "flex",
    justifyContent: "center",
  },
  root: {
    width: "fit-content",
    margin: "10px",
  },
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
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
  },
  heading: {
    marginBottom: "12px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#002b80",
  },
});

export const Launches = ({ endPoint }) => {
  const [initialData, setInitialData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setInitialData(data);
      })
      .catch(console.log);
  }, [endPoint]);
  return (
    initialData.length > 0 && (
      <div className={classes.container}>
        {initialData.map((data) => {
          return (
            <Launch
              data-testid="Launch"
              key={data.flight_number}
              mission={data}
            />
          );
        })}
      </div>
    )
  );
};
