import axios from "axios";
import React, { useEffect, useState } from "react";
import { snackBarOpen, snackBarOpenMsg } from "../Redux/PropertySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../Redux/LoginSlice";

const AddUserFormLogics = () => {
  const dispatch = useDispatch();
  const url = useSelector((state: any) => state.ClientSlice.Url);
  const request = useSelector((state: any) => state.LoginSlice.request);
  const requestObject = useSelector((state: any) => state.LoginSlice.formData);
  const role = localStorage.getItem("role");
  const user_id = localStorage.getItem("user_id");

  const [userValues, setUserValues] = useState<any>(
    request === "Post"
      ? {
          Mobile_No: "",
          password1: "changeme",
          password2: "changeme",
          Full_Name: "",
          email: "",
          role:
            role === "SuperUser"
              ? "Builder"
              : role === "Builder"
              ? "Owner"
              : role === "Owner"
              ? "Tenent"
              : "",
          //   role: "SuperUser",
          GST_No: "",
          City: "",
          Address: "",
          Status: "Select",
        }
      : {
          Mobile_No: requestObject.Mobile_No,
          Full_Name: requestObject.Full_Name,
          email: requestObject.email,
          City: requestObject.City,
          GST_No: requestObject.GST_No,
          Address: requestObject.Address,
          Status: requestObject.Status,
        }
  );

  const handleClear = () => {
    setUserValues({
      Mobile_No: "",
      Full_Name: "",
      email: "",
      GST_No: "",
      City: "",
      Address: "",
      Status: "Select",
    });
  };
  const UserHandleChange = (e: any) => {
    const { name, value } = e.target;
    setUserValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const userHandleSubmit = () => {
    if (request === "Post") {
      axios
        .post(`${url}/user/signup/`, userValues)
        .then((res) => {
          console.log(res);
          dispatch<any>(snackBarOpenMsg<any>(res.data.response));
          dispatch<any>(snackBarOpen<any>(true));
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
        });

      setUserValues({
        Mobile_No: "",
        Full_Name: "",
        email: "",
        GST_No: "",
        City: "",
        Address: "",
        Status: "Select",
      });
    } else if (request === "Put") {
      axios
        .put(`${url}/user/${requestObject.User_ID}/update`, userValues)
        .then((res) => {
          console.log(res.data);
          dispatch<any>(snackBarOpenMsg<any>(res.data.response));
          dispatch<any>(snackBarOpen<any>(true));
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
        });

      setUserValues({
        Mobile_No: "",
        Full_Name: "",
        email: "",
        GST_No: "",
        City: "",
        Address: "",
        Status: "Select",
      });
    }
  };
  const handleDelete = (id: any) => {
    if (user_id === id) {
      window.alert("User cannot deleted");
    }
    axios
      .delete(`${url}/user/${id}/delete`)
      .then((res) => {
        dispatch<any>(snackBarOpenMsg<any>(res.data.response));
        dispatch<any>(snackBarOpen<any>(true));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    handleClear,
    userHandleSubmit,
    UserHandleChange,
    userValues,
    handleDelete,
  };
};

export default AddUserFormLogics;
