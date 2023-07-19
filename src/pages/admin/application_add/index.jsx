import ApplicationAddComponent from "../../../components/admin/application_add"
import Sidebar from "../../../components/sidebar"
import { dataSidebarDirector } from "../../director/sidebar-data"
import { dataSidebarManager } from "../../manager/sidebar-data"
import { dataSidebar } from "../sidebar-data"


function ApplicationAdd() {
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"))

    return(
        <>
        
        {data?.role === 'Admin' ?        <Sidebar  items={dataSidebar}>
            <ApplicationAddComponent />
          </Sidebar> : data?.role === 'manager' ? <Sidebar  items={dataSidebarManager}>
            <ApplicationAddComponent />
          </Sidebar> : data?.role === 'director' ? <Sidebar  items={dataSidebarDirector}>
            <ApplicationAddComponent />
          </Sidebar> : null}
        </>
    )
}
export default ApplicationAdd