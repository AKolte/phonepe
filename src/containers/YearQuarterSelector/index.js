import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Popover,
} from "@mui/material";
import React, { useContext, useState } from "react";
import FilterContext from "../../FilterContext";

const YearQuarterSelector = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const [localFilter, setLocalFilter] = useState(filter);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dataRange = require("../../data/dataRange.json");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYearSelection = (year) => {
    // set the year AND if latest year is selected and data for all quarters is not available then select Q1
    year === dataRange.years[dataRange.years.length - 1] &&
    dataRange.lastYearLastQuarter < 4
      ? setLocalFilter({ ...localFilter, year, quarter: 1 })
      : setLocalFilter({ ...localFilter, year });
  };

  const handleQuarterSelection = (quarter) => {
    setLocalFilter({ ...localFilter, quarter });
  };

  const applyFilters = () => {
    setFilter({
      ...filter,
      year: localFilter.year,
      quarter: localFilter.quarter,
    });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant={open ? "contained" : "outlined"}
        style={{ marginRight: "10px" }}
        onClick={handleClick}
      >
        Q{filter.quarter}
        &nbsp;
        {filter.year}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card style={{ maxWidth: "400px" }}>
          <CardContent>
            Quarter
            <br />
            <Divider />
            {/*               
              We should not give option to click on quarters for which the data is not available (i.e. ongoing and upcoming quarters of the current year)
              dataRange.json holds the info about the years and quarters which have data
              example: at the time of writing this code, 2021 Q4 data is not available, so the Q4 Chip disappears when we click on 2021 and Q1 is selected as default
 */}
            {dataRange.quarters.map(
              (
                quarter //for each quarter
              ) =>
                localFilter.year ===
                dataRange.years[dataRange.years.length - 1] ? ( //check if the selected year is the latest year
                  dataRange.lastYearLastQuarter >= quarter && ( //for latest year make sure that we dont go beyond latest quarter (current/upcoming quarter)
                    <Chip
                    id={`Q${quarter}`}
                      style={{ margin: "5px", textTransform: "capitalize" }}
                      label={`Q${quarter}`}
                      variant={
                        localFilter.quarter === quarter ? "filled" : "outlined"
                      }
                      onClick={() => handleQuarterSelection(quarter)}
                    />
                  )
                ) : (
                  <Chip //for years that have data of all 4 quarters
                    id={`Q${quarter}`}
                    style={{ margin: "5px", textTransform: "capitalize" }}
                    label={`Q${quarter}`}
                    variant={
                      localFilter.quarter === quarter ? "filled" : "outlined"
                    }
                    onClick={() => handleQuarterSelection(quarter)}
                  />
                )
            )}
            <br />
            <br />
            Year
            <Divider />
            {dataRange.years.map((year) => (
              <Chip
                style={{ margin: "5px", textTransform: "capitalize" }}
                label={year}
                variant={localFilter.year === year ? "filled" : "outlined"}
                onClick={() => handleYearSelection(year)}
              />
            ))}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={applyFilters}>
              Done
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
};

export default YearQuarterSelector;
