import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientDataFiltered, fetchClientData } from "../Redux/ClientSlice";
import { useParams } from "react-router-dom";
import { getUniqueValuesFromArray } from "./Constants";
import axios from "axios";

export const PropertyDataLogics = () => {
  const { id, propertyName }: any = useParams();
  const [data, setData] = React.useState([]);

  const Idx = parseInt(id);
  const dispatch = useDispatch();
  const Data: any = useSelector((state: any) => state.ClientSlice.clientData);
  const [block, setBlock] = React.useState<string>("All");
  const [search, setSearch] = React.useState<string>("");
console.log(Data)
  const FilteredData = Data.filter(
    (item: any) => item.Client_PropertyID.Property_ID === Idx
  );
  const blockType = getUniqueValuesFromArray(FilteredData, "Client_Block");
  const handleFilterChange = (key: string, value: string) => {
    if (key === "block") {
      setBlock(value);
    }
  };
  React.useEffect(() => {
    dispatch<any>(fetchClientData());
  }, []);

  const filteredClients = React.useMemo(() => {
    let filtered = FilteredData;
    if (block !== "All") {
      filtered = filtered.filter(
        (property: any) => property.Client_Block === block
      );
    }
    filtered = FilteredData.filter(
      (property: any) =>
        property.Client_PropertyID.User_ID.Full_Name.toLowerCase().includes(
          search.toLowerCase()
        ) ||
        property.Client_ListingType.toLowerCase().includes(search.toLowerCase())
    );

    return filtered;
  }, [search, block, Data]);

  React.useEffect(() => {
    dispatch<any>(clientDataFiltered<any>(filteredClients));
  }, [dispatch, filteredClients]);

  const handleSearchClear = () => {
    setSearch("");
  };

  return {
    Data,
    block,
    blockType,
    setBlock,
    handleFilterChange,
    search,
    setSearch,
    propertyName,
    handleSearchClear,
  };
};
