import React from "react";
import Layout from "../components/Layout/Layout";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
