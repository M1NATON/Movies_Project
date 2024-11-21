import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../app/slices/UserSlice";
import { movieStatusApi } from "../app/services/movieStatusApi";

type ErrorData = {
  message?: string;
  statusCode?: number;
};

type ApiError = {
  data?: ErrorData;
  status?: number;
};

const Layout = () => {
  // const auth = useSelector(selectIsAuthenticated);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/auth");
  //   }
  // }, [auth]);

  const { error } = movieStatusApi.useGetStatusQuery() as { error?: ApiError };

  useEffect(() => {
    if (error?.data?.statusCode === 401) {
      localStorage.removeItem("token");
    }
  }, [error]);

  return (
    <div className={"flex min-h-[100vh] flex-col text-foreground"}>
      <Navbar />
      <div className="flex-grow container mx-auto mt-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
