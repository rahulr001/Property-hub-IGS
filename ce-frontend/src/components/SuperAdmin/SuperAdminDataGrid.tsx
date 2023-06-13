import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  userFilteredlist,
  fetchUserList,
  userRequestObjects,
  userRequests,
} from "../../Redux/LoginSlice";
import { SuperAdminDataGridLogics } from "../../Utils/SuperAdminDataGridLogics";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import AddUserFormLogics from "../../Utils/AddUserFormLogics";

export default function SuperAdminDataGrid() {
  const { role } = SuperAdminDataGridLogics();
  const filteredUserList: any = useSelector(
    (state: any) => state.LoginSlice.filteredList
  );
  console.log("data", filteredUserList);
  const { handleDelete } = AddUserFormLogics();
  const dispatch = useDispatch();
  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          <IconButton
            sx={{ boxShadow: 0, color: "black" }}
            aria-label="edit"
            component={Link}
            to={"/add_user"}
            onClick={() => {
              console.log(",,", params.row);
              dispatch<any>(userRequestObjects<any>(params.row));
              dispatch<any>(userRequests<any>("Put"));
            }}
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            sx={{ boxShadow: 0, color: "red" }}
            size="small"
            aria-label="edit"
                  onClick={() => {
                console.log(params.row.User_ID)
              handleDelete(params.row.User_ID);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "Full_Name",
      headerName: "Name",
      width: 200,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "Role",
      headerName: "Role",
      width: 210,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },

    {
      field: "Status",
      headerName: "Status",
      type: "number",
      width: 200,
      headerAlign: "center",
      align: "center",

      // editable: true,
      renderCell: (params) => {
        const status = params.value as string;
        return (
          <p
            style={{
              background: status === "Active" ? "#36B37E33" : "#FF563033",
              color: status === "Active" ? "#1B806A" : "#B71D18",
              padding: ".4rem",
              borderRadius: "10px",
            }}
          >
            {status}
          </p>
        );
      },
    },
  ];
  const modifiedColumn =
    role === "owner"
      ? columns.filter((col: any) => col.field !== "Role")
      : columns;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          border: "none",
          "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
            backgroundColor: "#ffffff00",
            borderRadius: "5px",
            borderBottom: "none",
          },
        }}
        getRowId={(row: any) => row.User_ID}
        rows={filteredUserList ? filteredUserList : []}
        columns={modifiedColumn}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
