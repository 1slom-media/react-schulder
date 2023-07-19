import React, { useState } from "react";
import { Button, notification, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CommentOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useTranslation } from "react-i18next";
import LanguageComponent from "../header-language";
import "./sidebar.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { TaskGet, TaskDelete } from "../../redux/task/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const { Header, Sider, Content } = Layout;

const Sidebar = ({ children, items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const data = JSON.parse(window.localStorage.getItem("AuthDataUser"));
  const { t } = useTranslation();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const HandleRemove = async () => {
    window.localStorage.removeItem("AuthTokenUser");
    window.localStorage.removeItem("AuthDataUser");
    await navigate("/");
    window.location.reload();
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const close = () => {
    return  "Notification was closed. Either the close button was clicked or duration time elapsed."
  };
  const dispatch = useDispatch();
  const HandleDelete = async (e) => {
    await dispatch(TaskDelete(e.currentTarget.id));
    dispatch(TaskGet());
    window.location.reload()
  };

  useEffect(() => {
    dispatch(TaskGet());
  }, []);

  const TaskGets = useSelector((state) => state.Task.TaskGet.data);
  const findId = TaskGets.filter((task) => task.staff.id == data.id);
  const taskLength = findId.filter((length) => length.status == "sent");


  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="notification-body">
          {findId.map((task) => (
            <div
              id={task.id}
              onDoubleClick={HandleDelete}
              className="body-item"
            >
              <div className="user-wrapper">
                <div className="users-wrapper">
                  <div className="icon-box">
                    <i class="bx bxs-user-circle"></i>
                  </div>
                  <div className="icon-title">
                    <h3>{task.staff.staff_name}</h3>
                    <p>{task.staff.role}</p>
                  </div>
                </div>
                {task.status == 'sent' ? <div className="sent-dot"></div> : null}
              </div>
              <div className="message-box">
                <p>{task.task}</p>
                <time>{task.deadline}</time>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </Space>
    );
    api.open({
      btn,
      key,
      onClose: close,
    });
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ backgroundColor: "#5A79E5" }}
        width={240}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <h3 style={{ color: "white", fontSize: "20px" }}>LOGO</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ backgroundColor: "#5A79E5" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="left">
            <LanguageComponent />
            <div className="icons">
              <CommentOutlined style={{ fontSize: "20px", color: "#484343" }} />
              {contextHolder}
              <div className="task-div">
               {taskLength.length ?  <span className="task-length">{taskLength.length}</span> : null}
                <BellOutlined
                  onClick={openNotification}
                  style={{ fontSize: "20px", color: "#484343" }}
                />
              </div>

              <QuestionCircleOutlined
                style={{ fontSize: "20px", color: "#484343" }}
              />
            </div>
            <div className="profile">
              <div className="profile-right">
                <p>
                  {data.staff_name} {data.staff_surname}
                </p>
                <p>{data.email}</p>
              </div>
              <img src={data.image} className="user-icon" width={50} height={50} alt="" />
              <button onClick={HandleRemove}>{t("admin_header.0")}</button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#EEEFF5",
            overflowY: "auto",
            height: "85vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
