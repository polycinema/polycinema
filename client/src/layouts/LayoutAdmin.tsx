import React from "react";
import logo1 from "../../public/img/logo.png";
import { Link, Outlet } from "react-router-dom";
import { AppstoreOutlined, GroupOutlined, LogoutOutlined, TeamOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined, SolutionOutlined, ShopOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Layout, Menu, Popconfirm, theme } from "antd";
import { useAppDispatch } from "../store/hook";
import { setLogout } from "../redux/slices/authorizationSlice";

import { CiBoxes } from "react-icons/ci";

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
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
              icon: <ShopOutlined />,
              label: <Link to={"products"}>Product</Link>,
            },
            {
              key: 10,
              icon: <FieldTimeOutlined />,
              label: <Link to={"showtime"}>ShowTime</Link>,
            },
            {
              key: 11,
              icon: <CiBoxes />,
              label: <Link to={"seat"}>Seat</Link>,
            },
            {
              key: 12,
              icon: <LogoutOutlined />,
              label: (
                <Popconfirm
                  title="Đăng xuất tài khoản"
                  description="Bạn có muốn đăng xuất?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => dispatch(setLogout())}
                >
                  Logout
                </Popconfirm>
              ),
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
