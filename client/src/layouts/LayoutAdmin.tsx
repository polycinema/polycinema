import React, { useState } from "react";
import logo1 from "../../public/img/logo-white.png";
import { Link, Outlet } from "react-router-dom";
import { AppstoreOutlined, GroupOutlined, LogoutOutlined, TeamOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined, SolutionOutlined, ShopOutlined, FieldTimeOutlined, CalendarOutlined } from "@ant-design/icons";
import { Layout, Menu, Popconfirm, theme } from "antd";
import { useAppDispatch } from "../store/hook";
import { setLogout } from "../redux/slices/authorizationSlice";
import { AiFillGold } from "react-icons/ai";
const {  Header,Content, Footer, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to={"/"}>
          <img src={logo1} alt="" className="w-28   " />
        </Link>
        
      </Header>
      
      <Layout>
      <Sider
      collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
       
      >
        <div className="demo-logo-vertical" />
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: 1,
              icon: <AppstoreOutlined />,
              label: <Link to={"statistic"}>Thống kê</Link>,
            },
            {
              key: 2,
              icon: <CalendarOutlined />,
              label: <Link to={"booking"}>Quản lý đặt vé</Link>,
            },
            {
              key: 3,
              icon: <FieldTimeOutlined />,
              label: <Link to={"showtime"}>Quản lý lịch chiếu</Link>,
              
            },
            {
              key: 4,
              icon: <SolutionOutlined />,
              label: <Link to={"coupon"}>Quản lý mã giảm</Link>,
              
            },
            {
              key: 5,
              icon: <VideoCameraOutlined />,
              label: <Link to={"movies"}>Quản lý phim</Link>,
            },
            {
              key: 6,
              icon: <UserOutlined />,
              label: "Quản lý tài khoản",
              children:[
                {key:50,icon: <UserOutlined />, label:<Link to={"acountUser"}>Khách hàng</Link>},
                {key:51,icon: <UserOutlined />, label:<Link to={"acountAdmin"}>Quản trị</Link>}
              ]
              
            },
            {
              key: 15,
              icon: <AiFillGold /> ,
              label: <Link to={"seats"}>Quản lý thể loại ghế</Link>,
            },
            {
              key: 7,
              icon: <UserSwitchOutlined />,
              label: <Link to={"director"}>Quản lý đạo diễn</Link>,
            },
            {
              key: 8,
              icon: <SolutionOutlined />,
              label: <Link to={"rooms"}>Quản lý phòng</Link>,
            },
            {
              key: 9,
              icon: <GroupOutlined />,
              label: <Link to={"news"}>Quản lý tin tức</Link>,
            },
            {
              key: 10,
              icon: <ShopOutlined />,
              label: <Link to={"products"}>Quản lý sản phẩm</Link>,
            },
            {
              key: 11,
              icon: <TeamOutlined />,
              label: <Link to={"actors"}>Quản lý diễn viên</Link>,
            },
            {
              key: 12,
              icon: <SolutionOutlined />,
              label: <Link to={"banner"}>Quản lý banner</Link>,
            },
            {
              key: 13,
              icon: <GroupOutlined />,
              label: <Link to={"genres"}>Quản lý thể loại</Link>,
            },
            {
              key: 14,
              icon: <LogoutOutlined />,
              label: (
                <Popconfirm
                  title="Đăng xuất tài khoản"
                  description="Bạn có muốn đăng xuất?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => dispatch(setLogout())}
                >
                  Đăng xuất
                </Popconfirm>
              ),
            },
          ]}
        />
      </Sider>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
            }}
          >
            <Outlet />
            
          </div>
          
        </Content>
        
      </Layout>
      <Footer className="text-center  ">
          Website Đặt vé xem phim Polycinema@
      </Footer>
    </Layout>
  );
};
export default LayoutAdmin;
