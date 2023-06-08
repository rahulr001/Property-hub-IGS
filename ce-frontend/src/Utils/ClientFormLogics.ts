import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { snackBarOpen, snackBarOpenMsg } from "../Redux/PropertySlice";

export const ClientFormLogics = () => {
  const dispatch = useDispatch();
  const { property_id, propertyName }: any = useParams();
  const url = useSelector((state: any) => state.ClientSlice.Url);
  const [values, setValues] = useState<any>({
    Client_PropertyID: parseInt(property_id),
    Client_FullName: "",
    Client_MobileNumber: null,
    Client_EMail: "",
    Client_Block: "",
    Client_FlatNo: "",
    Client_PropertyTitle: propertyName,
    Client_PropertyType: "Select",
    Client_ListingType: "Select",
    Client_Location: "",
    Client_Address: "",
    Client_ListingPrice: null,
    Client_BHK: "Select",
    Client_Status: "Select",
    Client_ParkingLot: "Select",
    Client_ConstructionSqft: null,
    Client_LandSqft: null,
    Client_ShortDesc: "",
    Client_LongDesc: "",
    Client_PropertyAmenities: [],
    Client_ImgURL: "",
  });
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
      Client_MobileNumber: null,
      Client_EMail: "",
      Client_Block: "",
      Client_FlatNo: "",
      Client_PropertyTitle: "",
      Client_PropertyType: "Select",
      Client_ListingType: "Select",
      Client_Location: "",
      Client_Address: "",
      Client_ListingPrice: null,
      Client_BHK: "Select",
      Client_Status: "Select",
      Client_ParkingLot: "Select",
      Client_ConstructionSqft: null,
      Client_LandSqft: null,
      Client_ShortDesc: "",
      Client_LongDesc: "",
      Client_PropertyAmenities: [],
      Client_ImgURL: "",
    });
  };
  const handleSubmit = () => {
    axios
      .post(`${url}/clients/`, values)
      .then((res) => {
        console.log(res.data);
        dispatch<any>(snackBarOpenMsg<any>(res.data.Response));
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
            err.response.data.Client_PropertyAmenities
        );
      });

    setValues({
      Client_PropertyID: parseInt(property_id),
      Client_FullName: "",
      Client_MobileNumber: null,
      Client_EMail: "",
      Client_Block: "",
      Client_FlatNo: "",
      Client_PropertyTitle: propertyName,
      Client_PropertyType: "Select",
      Client_ListingType: "Select",
      Client_Location: "",
      Client_Address: "",
      Client_ListingPrice: null,
      Client_BHK: "Select",
      Client_Status: "Select",
      Client_ParkingLot: "Select",
      Client_ConstructionSqft: null,
      Client_LandSqft: null,
      Client_ShortDesc: "",
      Client_LongDesc: "",
      Client_PropertyAmenities: [],
      Client_ImgURL: "",
    });
  };

  return {
    handleChange,
    handleCheckbox,
    handleSubmit,
    values,
    handleClear,
  };
};
