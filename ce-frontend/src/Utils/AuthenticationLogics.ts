import { useDispatch, useSelector } from "react-redux";
import LoginSlice from "../Redux/LoginSlice";
import { useState } from "react";
import { loginError } from "../Redux/LoginSlice";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { snackBarOpen, snackBarOpenMsg } from "../Redux/PropertySlice";
import { Token } from "../Redux/LoginSlice";

export const AuthenticationLogics = () => {
  const [token, setToken] = useState<any>(null);
  const [ChangePassValues, setChangePassValues] = useState({
    old_password: "",
    new_password1: "",
    new_password2: "",
  });
  const url = useSelector((state: any) => state.ClientSlice.Url);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    Mobile_No: "",
    password: "",
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
  const handleSubmit = async () => {
    try {
      axios
        .get(`${url}/clients/client_login/${values.Mobile_No}`)
        .then((res) => {
          if (res.data.Client_Role === "Owner") {
            axios.post(`${url}/clients/client_login/`, values).then((res) => {
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("role", res.data.context.role);
              localStorage.setItem("user_id", res.data.context.user_id);
              navigate("/super_admin");
            });
          } else {
            axios
              .post(`${url}/user/token/`, values)
              .then((res) => {
                console.log(res);
                const decodedToken: any = jwtDecode(res.data.access);
                console.log(decodedToken);
                setToken(decodedToken);
                dispatch<any>(Token<any>(res.data.access));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", decodedToken.role);
                localStorage.setItem("user_id", decodedToken.User_ID);
                const role = decodedToken.role;
                role === "SuperUser"
                  ? navigate("/super_admin")
                  : navigate("/home");
              })
              .catch((err: any) => {
                console.log("res", err);
                dispatch<any>(snackBarOpenMsg<any>(err.response.data.detail));
                dispatch<any>(snackBarOpen<any>(true));
                dispatch<any>(loginError<any>(true));
                console.log(err);
              });
          }
        });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleClick = (element: any) => {
    if (element == "Logout") {
      try {
        axios.post(`${url}/user/logout/`).then((res) => {
          console.log(res);
          localStorage.removeItem("isLoggedIn");
          navigate("/");
        });
      } catch (err) {
        console.log(err);
      }
    } else if (element == "Users") {
      navigate("/super_admin");
    } else if (element == "Dashboard") {
      navigate("/home");
    } else if (element == "Change Password") {
      navigate("/change_password");
    }
  };
  const accessToken = useSelector((state: any) => state.LoginSlice.accessToken);
  const authToken = `Bearer ${accessToken}`;

  const axiosInstance = axios.create({
    headers: {
      Authorization: authToken,
    },
  });
  ``;

  const ChangePassHandleChange = (e: any) => {
    const { name, value } = e.target;
    setChangePassValues((preVal: any) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const ChangePassHandleSubmit = async () => {
    console.log("token", accessToken);
    try {
      if (!accessToken) {
        window.alert("Session expired please login again");
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      }
      let res = await axiosInstance.post(
        `${url}/user/change_password/`,
        ChangePassValues
      );
      console.log(res);
      navigate("/home");
    } catch (err) {
      dispatch<any>(snackBarOpen<any>(true));
      //   dispatch<any>(loginError<any>(true));
      console.log(err);
    }
  };
  return {
    handleSubmit,
    handleChange,
    values,
    handleClick,
    ChangePassValues,
    ChangePassHandleSubmit,
    ChangePassHandleChange,
  };
};
