import React, { useState } from "react";
import Launches from "../Launches";
import { makeStyles } from "@material-ui/styles";
import * as CONSTANTS from "../../constants";

export const useStyles = makeStyles(() => ({
  mainContainer: {
    height: "100%",
    maxWidth: "1440px",
    backgroundColor: "#e6e6e6",
    margin: "auto",
    "@media (max-width: 700px) ": {
      width: "min-content",
      margin: "25px auto",
    },
  },
  header: {
    fontSize: "20px",
    fontWeight: 600,
    padding: "5px 10px",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    "@media (max-width: 700px) ": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  filters: {
    position: "relative",
    width: "200px",
    background: "white",
    height: "550px",
    margin: "5px 10px",
    borderRadius: "5px",
    fontWeight: 600,
    padding: "5px",
    fontSize: "14px",
  },
  launchItems: {
    width: "75%",
    "@media (max-width: 700px) ": {
      width: "220px",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  filterTitle: {
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 400,
    padding: "5px",
    "&:after": {
      content: '" "',
      position: "absolute",
      left: "40px",
      width: "125px",
      height: "18px",
      borderBottom: "1px solid grey",
    },
  },
  filterItems: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttonStyle: {
    borderRadius: "5px",
    background: "#95d095",
    height: "25px",
    width: "65px",
    border: "none",
    margin: "8px 13px",
    "&:hover": {
      backgroundColor: "#4CAF50",
    },
  },
  buttonClickedStyle: {
    backgroundColor: "#4CAF50",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    width: "100%",
    margin: "20px 0",
  },
  footerLabel: {
    fontWeight: 600,
  },
}));

export const HomePage = () => {
  const [endPoint, setEndPoint] = useState(
    "https://api.spaceXdata.com/v3/launches?limit=100"
  );
  const [selection, setSelection] = useState({
    launch_success: false,
    land_success: false,
    launch_year: 0,
  });
  const classes = useStyles();

  const yearRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (v, k) => k + start);
  };
  const filterContent = React.useCallback(() => {
    const baseEndPoint = "https://api.spaceXdata.com/v3/launches?limit=100";
    switch (true) {
      case selection.launch_success &&
        selection.land_success &&
        parseInt(selection.launch_year) !== 0:
        setEndPoint(
          baseEndPoint +
            `&launch_success=true&land_success=true&launch_year=${selection.launch_year}`
        );
        break;
      case selection.launch_success && selection.land_success:
        setEndPoint(baseEndPoint + "&launch_success=true&land_success=true");
        break;
      case selection.launch_success:
        setEndPoint(baseEndPoint + "&launch_success=true");
        break;

      default:
        return baseEndPoint;
    }
  }, [selection]);
  const handleClick = (e) => {
    const targetID = e.target.id;
    const targetValue = e.target.value;
    if (targetID === "Launch Year" && targetValue > 0) {
      setSelection({
        ...selection,
        launch_year: parseInt(targetValue),
      });
    } else if (targetID === "Successful Launch" && targetValue === "True") {
      setSelection({
        ...selection,
        launch_success: true,
      });
    } else if (targetID === "Successful Landing" && targetValue === "True") {
      setSelection({
        ...selection,
        land_success: true,
      });
    }
  };

  React.useEffect(() => {
    filterContent();
  }, [filterContent]);
  const renderYearFilter = (fieldName) => {
    const yearRangeValues = yearRange(2006, 2020);
    return yearRangeValues.map((year) => (
      <button
        className={classes.buttonStyle}
        key={year}
        value={year}
        id={fieldName}
        onClick={handleClick}
      >
        {year}
      </button>
    ));
  };
  const renderLaunchAndLandFilter = (fieldName) => {
    return CONSTANTS.BOOLEAN_BUTTONS.map((value, index) => (
      <button
        className={classes.buttonStyle}
        key={index}
        value={value}
        id={fieldName}
        onClick={handleClick}
      >
        {value}
      </button>
    ));
  };
  const renderFilter = (title, renderItems) => (
    <>
      <div className={classes.filterTitle}>{title}</div>
      <div className={classes.filterItems}>{renderItems}</div>
    </>
  );

  return (
    <>
      {" "}
      <div className={classes.mainContainer}>
        <div className={classes.header}>SpaceX Launch Programs</div>
        <div className={classes.itemContainer}>
          <div className={classes.filters}>
            Filters
            {CONSTANTS.FILTERS_CATEGORY.map((value, index) =>
              index === 0
                ? renderFilter(value, renderYearFilter(value))
                : renderFilter(value, renderLaunchAndLandFilter(value))
            )}
            {}
          </div>
          <div className={classes.launchItems}>
            <Launches endPoint={endPoint} />
          </div>
        </div>
        <div className={classes.footer}>
          <span className={classes.footerLabel}> Developed by:</span>
          {CONSTANTS.AUTHOR}
        </div>
      </div>
    </>
  );
};
