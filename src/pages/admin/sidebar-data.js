import {
  BarChartOutlined,
  CopyOutlined,
  TeamOutlined,
  TableOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function GetValueLang() {
  return window.localStorage.getItem("i18nextLng");
}
export const dataSidebar = [
    {
        key: "1",
        icon: <CopyOutlined />,
        label: (
            <NavLink to="/admin/application" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Ilovalar" 
            :GetValueLang() == "ru" ? "Заявки" 
            :GetValueLang() == "en" ? "Applications" :null}</NavLink>
        ),
      },
      {
        key: "2",
        icon: <BarChartOutlined />,
        label: (
            <NavLink to="/admin/finance" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Moliya" 
            :GetValueLang() == "ru" ? "Финансы" 
            :GetValueLang() == "en" ? "Finance" :null}</NavLink>
        ),
      },
      {
        key: "3",
        icon: <TeamOutlined />,
        label: (
            <NavLink to="/admin/employees" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Xodimlar" 
            :GetValueLang() == "ru" ? "Сотрудники" 
            :GetValueLang() == "en" ? "Employees" :null}</NavLink>
        ),
      },
      {
        key: "4",
        icon: <TableOutlined />,
        label: (
            <NavLink to="/admin/chess" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Shaxmat" 
            :GetValueLang() == "ru" ? "Шахматка" 
            :GetValueLang() == "en" ? "Chess" :null}</NavLink>
        ),
      },
      {
        key: "5",
        icon: <EllipsisOutlined />,
        label: (
            <NavLink to="/admin/additservies" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Qo'shimcha xizmatlar" 
            :GetValueLang() == "ru" ? "Доп услуги" 
            :GetValueLang() == "en" ? "Additional services" :null}</NavLink>
        ),
      },
      {
        key: "6",
        icon: <SettingOutlined />,
        label: (
            <NavLink to="/admin/setting" style={{fontSize:"17px"}}>{GetValueLang() == "uz" ? "Sozlash" 
            :GetValueLang() == "ru" ? "Настройка" 
            :GetValueLang() == "en" ? "Setting" :null}</NavLink>
        ),
      },
]
