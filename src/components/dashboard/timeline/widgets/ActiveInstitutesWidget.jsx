import React, { useState, useEffect } from "react";
import axios from "axios";
import SchoolIcon from "@mui/icons-material/School";
import Avatar from "@mui/joy/Avatar";
// import "../components/css/Event.css";
import { Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

export function ActiveInstitutesWidget() {
  const [allInstitute, setallInstitute] = useState(null);
  const fetchAllInstitute = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "timeline/getAllInstitute").then((response) => setallInstitute(response.data));
  };
  useEffect(() => {
    fetchAllInstitute();
  }, []);
  return (
    <List
      disablePadding
      className="border shadow-sm rounded-4"
      style={{ overflow: "hidden" }}
      subheader={
        <ListSubheader className="text-center py-2 top-0" component="div">
          <h4 className="my-2">Active Institutes</h4>
        </ListSubheader>
      }>
      <Divider variant="fullwidth" component="li" />
      {allInstitute?.map((institute, index) => {
        if (index < 6) {
          return (
            <>
              <ListItem key={index}>
                <ListItemIcon>
                  <Avatar size="lg" className="" src={institute.logo}>
                    {!institute.logo && <SchoolIcon />}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={institute.institution_name} />
              </ListItem>
            </>
          );
        }
      })}
    </List>
  );
}
