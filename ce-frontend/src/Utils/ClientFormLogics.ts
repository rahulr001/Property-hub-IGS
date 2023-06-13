import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { snackBarOpen, snackBarOpenMsg } from "../Redux/PropertySlice";
import AddUserFormLogics from "./AddUserFormLogics";

export const ClientFormLogics = () => {
  const dispatch = useDispatch();
  const { property_id, propertyName }: any = useParams();
  const url = useSelector((state: any) => state.ClientSlice.Url);
  const request = useSelector((state: any) => state.ClientSlice.request);
  const requestObject = useSelector((state: any) => state.ClientSlice.formData);
  const userRequestObject = useSelector(
    (state: any) => state.LoginSlice.formData
  );
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
          Mobile_No: userRequestObject.Mobile_No,
          Full_Name: userRequestObject.Full_Name,
          email: userRequestObject.email,
          City: userRequestObject.City,
          GST_No: userRequestObject.GST_No,
          Address: userRequestObject.Address,
          Status: userRequestObject.Status,
        }
  );

  const UserHandleChange = (e: any) => {
    const { name, value } = e.target;
    setUserValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const [values, setValues] = useState<any>(
    request === "Post"
      ? {
          Client_PropertyID: parseInt(property_id),
          Client_Block: "11",
          Client_FlatNo: "11",
          Client_PropertyTitle: propertyName,
          Client_PropertyType: "Select",
          Client_ListingType: "Select",
          Client_ListingPrice: 100,
          Client_BHK: "Select",
          Client_Status: "Select",
          Client_ParkingLot: "Select",
          Client_ConstructionSqft: 100,
          Client_LandSqft: 100,
          Client_ShortDesc: "qq",
          Client_LongDesc: "qq",
          Client_PropertyAmenities: [],
        }
      : {
          Client_PropertyID: parseInt(
            requestObject.Client_PropertyID.Property_ID
          ),
          Client_Block: requestObject.Client_Block,
          Client_FlatNo: requestObject.Client_FlatNo,
          Client_PropertyTitle: requestObject.Client_PropertyTitle,
          Client_PropertyType: requestObject.Client_PropertyType,
          Client_ListingType: requestObject.Client_ListingType,
          Client_ListingPrice: requestObject.Client_ListingPrice,
          Client_BHK: requestObject.Client_BHK,
          Client_Status: requestObject.Client_Status,
          Client_ParkingLot: requestObject.Client_ParkingLot,
          Client_ConstructionSqft: requestObject.Client_ConstructionSqft,
          Client_LandSqft: requestObject.Client_LandSqft,
          Client_ShortDesc: requestObject.Client_ShortDesc,
          Client_LongDesc: requestObject.Client_LongDesc,
          Client_PropertyAmenities: requestObject.Client_PropertyAmenities,
        }
  );

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const handleCheckbox = (e: any) => {
    if (values.Client_PropertyAmenities.includes(e.target.value)) {
      setValues((preVal: any) => ({
        ...preVal,
        Client_PropertyAmenities: preVal.Client_PropertyAmenities.filter(
          (item: any) => item !== e.target.value
        ),
      }));
    } else {
      setValues((preVal: any) => ({
        ...preVal,
        Client_PropertyAmenities: [
          ...preVal.Client_PropertyAmenities,
          e.target.value,
        ],
      }));
    }
  };
  const handleClear = () => {
    setValues({
      Client_PropertyID: "",
      Client_Block: "",
      Client_FlatNo: "",
      Client_PropertyTitle: "",
      Client_PropertyType: "Select",
      Client_ListingType: "Select",
      Client_ListingPrice: null,
      Client_BHK: "Select",
      Client_Status: "Select",
      Client_ParkingLot: "Select",
      Client_ConstructionSqft: null,
      Client_LandSqft: null,
      Client_ShortDesc: "",
      Client_LongDesc: "",
      Client_PropertyAmenities: [],
    });
  };
  const handleSubmit = () => {
    console.log("data", values);
    if (request === "Post") {
      axios
        .post(`${url}/user/signup/`, userValues)
        .then((res) => {
          console.log(res);
          if (res.data.response === "User already exists") {
            dispatch<any>(snackBarOpenMsg<any>(res.data.response));
            dispatch<any>(snackBarOpen<any>(true));
          } else {
            axios
              .post(`${url}/clients/`, values)
              .then((res) => {
                console.log(res.data);
                dispatch<any>(snackBarOpenMsg<any>(res.data.response));
                dispatch<any>(snackBarOpen<any>(true));
              })
              .catch((err): any => {
                console.log(err);
                handleClear();
                window.alert(
                  err.response.data.Client_FullName ||
                    err.response.data.Client_ImgURL ||
                    err.response.data.Client_MobileNumber ||
                    err.response.data.Client_EMail ||
                    err.response.data.Client_FullName ||
                    err.response.data.Client_Block ||
                    err.response.data.Client_FlatNo ||
                    err.response.data.Client_PropertyTitle ||
                    err.response.data.Client_PropertyType ||
                    err.response.data.Client_ListingType ||
                    err.response.data.Client_Location ||
                    err.response.data.Client_Address ||
                    err.response.data.Client_ListingPrice ||
                    err.response.data.Client_BHK ||
                    err.response.data.Client_Status ||
                    err.response.data.Client_ParkingLot ||
                    err.response.data.Client_ConstructionSqft ||
                    err.response.data.Client_LandSqft ||
                    err.response.data.Client_ShortDesc ||
                    err.response.data.Client_LongDesc ||
                    err.response.data.Client_PropertyAmenities ||
                    "Something went wrong please login again"
                );
              });
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
        });
    } else if (request === "Put") {
      axios
        .put(`${url}/user/${userRequestObject.User_ID}/update`, userValues)
        .then((res) => {
          console.log(res.data);
          axios
            .put(`${url}/clients/${requestObject.Client_ID}/update`, values)
            .then((res) => {
              console.log(res.data);
              dispatch<any>(snackBarOpenMsg<any>(res.data.response));
              dispatch<any>(snackBarOpen<any>(true));
            })
            .catch((err): any => {
              console.log(err);
              handleClear();
              window.alert(
                err.response.data.Client_FullName ||
                  err.response.data.Client_ImgURL ||
                  err.response.data.Client_MobileNumber ||
                  err.response.data.Client_EMail ||
                  err.response.data.Client_FullName ||
                  err.response.data.Client_Block ||
                  err.response.data.Client_FlatNo ||
                  err.response.data.Client_PropertyTitle ||
                  err.response.data.Client_PropertyType ||
                  err.response.data.Client_ListingType ||
                  err.response.data.Client_Location ||
                  err.response.data.Client_Address ||
                  err.response.data.Client_ListingPrice ||
                  err.response.data.Client_BHK ||
                  err.response.data.Client_Status ||
                  err.response.data.Client_ParkingLot ||
                  err.response.data.Client_ConstructionSqft ||
                  err.response.data.Client_LandSqft ||
                  err.response.data.Client_ShortDesc ||
                  err.response.data.Client_LongDesc ||
                  err.response.data.Client_PropertyAmenities ||
                  "Something went wrong please login again"
              );
            });
        })
        .catch((err) => {
          console.log(err);
          window.alert(err);
        });
    }
  };

  const handleClientDelete = (user_Id: any, client_Id: any) => {
    if (user_id === user_Id) {
      window.alert("User cannot deleted");
    }
    axios
      .delete(`${url}/user/${user_Id}/delete`)
      .then((res) => {
        if (res.data.response === "User not found") {
          dispatch<any>(snackBarOpenMsg<any>(res.data.response));
          dispatch<any>(snackBarOpen<any>(true));
        } else {
          axios
            .delete(`${url}/clients/${client_Id}/delete`)
            .then((res) => {
              console.log(res);
              dispatch<any>(snackBarOpenMsg<any>(res.data.response));
              dispatch<any>(snackBarOpen<any>(true));
            })
            .catch((err) => {
              console.log(err);
            });
        }

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    handleChange,
    handleCheckbox,
    handleSubmit,
    values,
    handleClear,
    handleClientDelete,
    UserHandleChange,
    userValues,
  };
};
