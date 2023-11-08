import React from "react";
import logo1 from "../../public/img/logo1.png";
import { Link, Outlet } from "react-router-dom";
import { AppstoreOutlined, GroupOutlined, LogoutOutlined, TeamOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined, SolutionOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Link to={""}>
          <img src={logo1} alt="" className="w-32 mx-auto my-12" />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["4"]}
          items={[
            {
              key: 1,
              icon: <AppstoreOutlined />,
              label: <Link to={"dashboard"}>Dashboard</Link>,
            },
            {
              key: 2,
              icon: <TeamOutlined />,
              label: <Link to={"actors"}>Actors</Link>,
            },
            {
              key: 3,
              icon: <GroupOutlined />,
              label: <Link to={"genres"}>Genres</Link>,
            },
            {
              key: 4,
              icon: <VideoCameraOutlined />,
              label: <Link to={"movies"}>Movies</Link>,
            },
            {
              key: 5,
              icon: <UserSwitchOutlined />,
              label: <Link to={"director"}>Director</Link>,
            },
            {
              key: 6,
              icon: <UserOutlined />,
              label: <Link to={"acount"}>User</Link>,
            },
            {
              key: 7,
              icon: <SolutionOutlined />,
              label: <Link to={"rooms"}>Room</Link>,
            },
            {
              key: 8,
              icon: <GroupOutlined />,
              label: <Link to={"news"}>New</Link>,
            },
            {
              key: 9,
              icon: <LogoutOutlined />,
              label: <Link to={""}>Logout</Link>,
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
