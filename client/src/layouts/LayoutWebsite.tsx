import { Link, Outlet } from "react-router-dom";
import logo from "../../public/img/logo.png";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Dropdown, MenuProps, Popconfirm } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { setLogout } from "../redux/slices/authorizationSlice";
import { useEffect } from "react";

const LayoutWebsite = () => {
  useEffect(() => {
    // Khai báo hàm để load Dialogflow Messenger
    const loadChatbot = () => {
      window.dfMessenger = {
        intent: "WELCOME",
        chatTitle: "BetaCinema",
        agentId: "4c73e8f0-2ca2-48da-afd1-f8c2ee24a6bc",
        languageCode: "vi",
      };
      const e = document.createElement("script");
      e.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      e.async = true;
      document.head.appendChild(e);
    };

    // Gọi hàm loadChatbot khi component được mount
    loadChatbot();
  }, []);
  const { user }: any = useAppSelector((state) => state.Authorization);
  const dispatch = useAppDispatch();
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <Link to={"poly-member"}>
            <UserOutlined /> Thông tin tài khoản
          </Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className={`${user?.role !== "admin"? "hidden" : "block"}`}>
          <Link to={"admin"}>
            <UserOutlined /> Quản trị website
          </Link>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <Popconfirm
          title="Đăng xuất tài khoản"
          description="Bạn có muốn đăng xuất?"
          okText="Yes"
          cancelText="No"
          okType="default"
          onConfirm={() => dispatch(setLogout())}
        >
          <LogoutOutlined /> Đăng xuất
        </Popconfirm>
      ),
      key: "2",
    },
  ];
  return (

    <div className="m-auto">
      <div className="bg-black">
        <div className="text-white flex flex-row-reverse md:mx-40 md:-px-2">
          {user ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <button onClick={(e) => e.preventDefault()}>
                Xin chào: {user.name}
              </button>
            </Dropdown>
          ) : (
            <>
              <Link to={"poly-acount"} className="hover:text-[#397EBA] mx-1">
                Đăng ký
              </Link>{" "}
              |
              <Link to={"poly-acount"} className="hover:text-[#397EBA] mx-1">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="sticky top-0 z-50">
        <header className="border-b-[1px] border-[#E7E7E7] bg-white">
          <div className="md:max-w-6xl md:flex md:mx-auto md:justify-between  items-center">
            <div>
              <Link to={""}>
                <img className="w-[150px]" src={logo} alt="" />
              </Link>
            </div>
            <div>
              <ul className="flex md:space-x-6 space-x-5 md:py-4 font-bold md:text-lg sm:text-base justify-center my-2">
                <li>
                  <Link to={"poly-movies"} className="hover:text-[#397EBA]">
                    PHIM
                  </Link>
                </li>
                <li>
                  <Link to={""} className="hover:text-[#397EBA]">
                    GIÁ VÉ
                  </Link>
                </li>
                <li>
                  <Link to={"poly-news"} className="hover:text-[#397EBA]">
                    TIN MỚI VÀ ƯU ĐÃI
                  </Link>
                </li>
                <li>
                  <Link to={"poly-member"} className="hover:text-[#397EBA]">
                    THÀNH VIÊN
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>

      <main style={{ minHeight: "60vh" }} className="bg-[#F8F8F8]">
        <Outlet />
      </main>
      <div>
        <df-messenger intent="WELCOME" chat-title="Polycinema" agent-id="4c73e8f0-2ca2-48da-afd1-f8c2ee24a6bc" language-code="vi"></df-messenger>
      </div>
      <footer className="">
        <hr />

        <div className="md:m-auto md:max-w-6xl md:py-4">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div className="text-center md:text-left text-xs md:text-base">
              <Link to={""}>
                <img  src={logo} alt="" className="w-[150px]" />
              </Link>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={"poly-movies"}>Phim</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Giới thiệu</Link>
              </h2>

              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Giá Vé</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Hướng dẫn đặt vé online</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Thành Viên</Link>
              </h2>
            </div>
            <div className="text-center md:text-left font-semibold text-lg text-[#333333] pt-4 md:pt-0">
              <h1>KẾT NỐI VỚI CHÚNG TÔI</h1>
              <div className="md:flex md:space-x-4 ">
              <h2 className="hover:text-[#397EBA] text-3xl"> <Link target="_blank" to={"https://www.facebook.com/profile.php?id=61553856092989&...d=LQQJ4d"}><FacebookOutlined /></Link></h2>
               <h2 className="hover:text-[#397EBA] text-3xl"> <Link target="_blank" to={"https://www.instagram.com/pol_ycinema?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"}><InstagramOutlined /></Link></h2>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="md:text-lg md:font-semibold text-[#333333]">
                LIÊN HỆ
              </h1>
              <h2 className="text-sm  text-[#333333] pt-2">
                CÔNG TY CỔ PHẦN 7 THÀNH VIÊN
              </h2>

              <p className="text-[10px] pt-2">
                Địa chỉ trụ sở: Trụ sở chính Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
              </p>
              <p className="text-[10px] pt-2">Hotline: 1900 456789</p>
              <p className="text-[10px] pt-2">Email: polycinemas@gmail.com</p>
              <p className="font-semibold text-[#333333]  pt-2">
                Liên hệ hợp tác kinh doanh:
              </p>
              <p className=" pt-2 text-[13px]">Email: polycinemas@gmail.com</p>
              <p className=" pt-2 text-[13px]">Phone:  1900 456789 </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LayoutWebsite;
