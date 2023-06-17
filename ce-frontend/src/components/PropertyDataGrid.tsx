import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { PropertyDataLogics } from "../Utils/PropertyDataGridLogics";
import { Link } from "react-router-dom";
import { requestObjects, requests } from "../Redux/ClientSlice";
import { userRequestObjects, userRequests } from "../Redux/LoginSlice";
import { ClientFormLogics } from "../Utils/ClientFormLogics";
import AddUserFormLogics from "../Utils/AddUserFormLogics";
export default function PropertyDataGrid() {
  const { handleClientDelete } = ClientFormLogics();
  const { handleDelete } = AddUserFormLogics();
  const Data: any = useSelector(
    (state: any) => state.ClientSlice.filteredClientData
  );
  const dispatch = useDispatch();

  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: ".5rem",
          }}
        >
          {/* {params.row.Client_ID} */}
          <IconButton
            component={Link}
            to={"/client_form"}
            sx={{ boxShadow: 0, color: "black" }}
            aria-label="edit"
            onClick={() => {
              dispatch<any>(requestObjects<any>(params.row));
              dispatch<any>(requests<any>("Put"));
              dispatch<any>(
                userRequestObjects<any>(params.row.Client_PropertyID.User_ID)
              );
            }}
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            sx={{ boxShadow: 0, color: "red" }}
            size="small"
            aria-label="edit"
            onClick={() => {
              console.log(params.row);
              handleClientDelete(params.row.Client_ID);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
    },
    {
      field: "Client_FullName",
      headerName: "Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Client_Block",
      headerName: "Blocks",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Client_FlatNo",
      headerName: "Flat No",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Client_ListingType",
      headerName: "Type",
      type: "number",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Client_BHK",
      headerName: "BHK",
      type: "number",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Client_Status",
      headerName: "Status",
      type: "number",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const status = params.value as string;
        return (
          <p
            style={{
              background: status === "Active" ? "#36B37E33" : "#FF563033",
              padding: "0.5rem",
              borderRadius: "10px",
              color: status === "Active" ? "#1B806A" : "#B71D18",
            }}
          >
            {status}
          </p>
        );
      },
    },
  ];

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
        getRowId={(row: any) => row.Client_ID}
        rows={Data ? Data : []}
        columns={columns}
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
