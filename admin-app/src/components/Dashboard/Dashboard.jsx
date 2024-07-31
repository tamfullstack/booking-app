import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import InfoBoard from "./InfoBoard/InfoBoard";
import LatestTransactions from "./LatestTransactions/LatestTransactions";
import { url } from "../../utils/url";
import { getToken } from "../../utils/token";

export default function Dashboard() {
  const adminUser = useRouteLoaderData("root");
  const dashboardData = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
    }
  }, [adminUser, navigate]);

  return (
    <>
      <InfoBoard info={dashboardData?.info} />
      <LatestTransactions
        latestTransactions={dashboardData?.latestTransactions}
      />
    </>
  );
}

export const dashboardLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const res = await fetch(url + "transaction/dashboard", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
