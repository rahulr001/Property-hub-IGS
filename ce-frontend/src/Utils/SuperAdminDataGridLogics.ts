import { useDispatch, useSelector } from "react-redux";
import { fetchUserList, userFilteredlist } from "../Redux/LoginSlice";
import { useEffect, useMemo, useState } from "react";

export const SuperAdminDataGridLogics = () => {
  const Data: any = useSelector((state: any) => state.LoginSlice.userList);
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const filteredData = useMemo(() => {
    let filtered = Data.filter((property: any) =>
      property.Full_Name.toLowerCase().includes(search.toLowerCase())
    );
    if (role === "Builder") {
      filtered = Data.filter(
        (data: any) => data.Role === "Owner" || data.Role === "Tenent"
      );
    } else if (role === "Owner") {
      filtered = Data.filter((data: any) => data.Role === "Tenent");
    } else if (role === "SuperUser") {
      filtered = Data.filter(
        (data: any) =>
          data.Role === "Owner" ||
          data.Role === "Tenent" ||
          data.Role === "Builder"
      );
    }
    return filtered;
  }, [role, Data, search]);

  useEffect(() => {
    dispatch<any>(fetchUserList());
  }, []);
  useEffect(() => {
    dispatch<any>(userFilteredlist<any>(filteredData));
  }, [filteredData]);
  const handleSearchClear = () => {
    setSearch("");
  };
  return { role, search, setSearch, handleSearchClear };
};
