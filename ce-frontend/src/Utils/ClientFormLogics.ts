import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { snackBarOpen, snackBarOpenMsg } from "../Redux/PropertySlice";

export const ClientFormLogics = () => {
  const dispatch = useDispatch();
  const { property_id, propertyName }: any = useParams();
  const url = useSelector((state: any) => state.ClientSlice.Url);
  const request = useSelector((state: any) => state.ClientSlice.request);
  const requestObject = useSelector((state: any) => state.ClientSlice.formData);

  const user_id = localStorage.getItem("user_id");
  const [values, setValues] = useState<any>(
    request === "Post"
      ? {
          Client_PropertyID: parseInt(property_id),
          Client_FullName: "",
          Client_Mobile_No: null,
          Client_email: "",
          Client_GST_No: null,
          Client_Role: "Owner",
          Client_City: "",
          Client_Address: "",
          Client_password1: "changeme",
          Client_password2: "changeme",
          Client_Created_By: "default",
          Client_Updated_BY: "default",
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
          Client_FullName: requestObject.Client_FullName,
          Client_Mobile_No: requestObject.Client_Mobile_No,
          Client_email: requestObject.Client_email,
          Client_GST_No: requestObject.Client_GST_No,
          Client_Role: requestObject.Client_Role,
          Client_City: requestObject.Client_City,
          Client_Address: requestObject.Client_Address,
          Client_password1: requestObject.Client_password1,
          Client_password2: requestObject.Client_password2,
          Client_Created_By: requestObject.Client_Created_By,
          Client_Updated_BY: requestObject.Client_Updated_BY,
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
      Client_FullName: "",
      Client_Mobile_No: null,
      Client_email: "",
      Client_GST_No: null,
      Client_Role: "",
      Client_City: "",
      Client_Address: "",
      Client_password1: "changeme",
      Client_password2: "changeme",
      Client_Created_By: "",
      Client_Updated_BY: "",
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
    } else if (request === "Put") {
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
    }
  };

  const handleClientDelete = (client_Id: any) => {
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
  };

  return {
    handleChange,
    handleCheckbox,
    handleSubmit,
    values,
    handleClear,
    handleClientDelete,
  };
};
