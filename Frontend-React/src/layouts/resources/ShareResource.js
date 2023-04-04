/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// import useAxiosPrivate from "hooks/useAxiosPrivate";
// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Select from "react-select";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import Icon from "@mui/material/Icon";
// // import IconButton from "@mui/material/IconButton";

import MDButton from "components/MDButton";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import Modal from "react-awesome-modal";
import PropTypes from "prop-types";

import useAxiosPrivate from "hooks/useAxiosPrivate";

function NewResource({ showModal, setShowModal, openSuccessSB }) {
  const axiosPrivate = useAxiosPrivate();
  const [options, setOptions] = useState([]);

  const reset = () => {
    setShowModal(false);
    document.getElementById("error").innerHTML = "";
    openSuccessSB();
  };

  useEffect(async () => {
    console.log("in effect");
    try {
      const response = await axiosPrivate.get("/users", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("User data from post request", response?.data);
      if (response?.data.status === "Success") {
        const userEmails = [];
        for (let i = 0; i < response?.data.payload.length; i += 1) {
          userEmails.push({
            value: response?.data.payload[i].id,
            label: response?.data.payload[i].email,
          });
        }
        console.log("userEmails", userEmails);
        setOptions(userEmails);
        // reset();
        // openSuccessSB();
      }
    } catch (err) {
      console.log("Post request create resource error:", err);
    }
    // Do something with you data from CRX
  }, []);

  return (
    <Modal visible={showModal} effect="fadeInUp" width="60%" height="60%">
      <MDBox component="form" role="form" style={{ margin: "30px" }}>
        <MDTypography variant="h4">Share Credential</MDTypography>
        <br />
        <Select
          options={options}
          isMulti
          name="colors"
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select users..."
        />
        <br />
        <MDBox width="100%" display="flex">
          <MDButton variant="gradient" color="secondary" onClick={reset}>
            Cancel
          </MDButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <MDButton id="create" variant="gradient" color="info">
            Share
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

NewResource.defaultProps = {
  showModal: false,
  setShowModal: null,
  openSuccessSB: null,
};

// Typechecking props for the Header
NewResource.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  openSuccessSB: PropTypes.func,
};

export default NewResource;
