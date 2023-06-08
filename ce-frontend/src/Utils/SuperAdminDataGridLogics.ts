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
    if (role === "admin") {
      filtered = Data.filter(
        (data: any) => data.Role === "owner" || data.Role === "tenent"
      );
    } else if (role === "owner") {
      filtered = Data.filter((data: any) => data.Role === "tenent");
    } else {
      filtered = Data
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
