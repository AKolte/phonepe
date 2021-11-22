import { useContext, useState } from "react";
import React from "react";
import { getAllStateNames, getDistricts } from "../../utils";
import { ExpandMore } from "@material-ui/icons";
import "./styles.css";
import FilterContext from "../../FilterContext";
import {
  Button,
  Popover,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";

const LocationSelector = () => {
  const { filter, setFilter } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [districtNames, setDistrictNames] = useState(null);
  const handleClickGeoFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStateSelection = (state) => {
    setFilter({ ...filter, state, geo: "state-wise", district: null });
    setExpandedSection(null);
    setDistrictNames(getDistricts(state).sort());
  };

  const handleDistrictSelection = (district) => {
    setFilter({ ...filter, district, geo: "district-wise" });
    handleClose();
  };

  const stateNames = getAllStateNames().sort();
  return (
    <>
      <Button variant={open ? "contained" : "outlined"} style={{ marginRight: '10px' }} onClick={handleClickGeoFilter}>
        {filter.state}
        {filter.district ? ` | ${filter.district}` : ""}
      </Button>
      <Popover
        id={id}
        style={{ marginTop: "15px" }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card style={{ maxWidth: "600px" }}>
          <CardContent>
            <Accordion
              expanded={expandedSection === "state"}
              onChange={() =>
                expandedSection === "state"
                  ? setExpandedSection(null)
                  : setExpandedSection("state")
              }
            >
              <AccordionSummary
                className="titleCase"
                expandIcon={<ExpandMore />}
              >
                {filter.state}
              </AccordionSummary>
              <AccordionDetails>
                {stateNames.map((eachState) => (
                  <Chip
                    id={eachState}
                    style={{ margin: "5px", textTransform: "capitalize" }}
                    label={eachState}
                    variant="outlined"
                    onClick={() => handleStateSelection(eachState)}
                  />
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandedSection === "district"}
              onChange={() =>
                expandedSection === "district"
                  ? setExpandedSection(null)
                  : setExpandedSection("district")
              }
            >
              <AccordionSummary
                className="titleCase"
                expandIcon={<ExpandMore />}
              >
                {filter.district || "Select District"}
              </AccordionSummary>

              <AccordionDetails className="titleCase" style={{ marginBottom: '20px'}}>
                {districtNames?.map((eachDistrict) => (
                  <Chip
                    id={eachDistrict}
                    className="locationNames"
                    label={eachDistrict.replace(" district", "")}
                    variant="outlined"
                    onClick={() => handleDistrictSelection(eachDistrict)}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default LocationSelector;
