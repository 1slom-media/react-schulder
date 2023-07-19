import React from "react";
import styles from "./style.module.css";
import AdditServiesComponent from "../../../components/admin/addit_services";
import { dataSidebar } from "../sidebar-data";
import Sidebar from "../../../components/sidebar/index";
import { dataSidebarManager } from "../../manager/sidebar-data";
import { dataSidebarDirector } from "../../director/sidebar-data";

const AdditServies = () => {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

  return (
    <>
    {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
        <AdditServiesComponent />
      </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
        <AdditServiesComponent />
      </Sidebar> : data?.role === 'director'? <Sidebar  items={dataSidebarDirector}>
        <AdditServiesComponent />
      </Sidebar>  : null}

    </>
  );
};

export default AdditServies;
