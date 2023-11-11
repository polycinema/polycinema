import { Link, Outlet } from "react-router-dom";
import logo from "../../public/img/logo.jpg";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Dropdown, MenuProps, Popconfirm } from "antd";
import {
  AimOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SketchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { setLogout } from "../redux/slices/authorizationSlice";
const LayoutWebsite = () => {
  const { user }: any = useAppSelector((state) => state.Authorization);
  const dispatch = useAppDispatch();
  console.log("user: ", user);
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <UserOutlined /> Thông tin tài khoản{" "}
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div>
          <SketchOutlined /> Thẻ thành viên
        </div>
      ),
      key: "1",
    },

    {
      label: (
        <div>
          <AimOutlined /> Điểm beta
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div>
          <ShoppingOutlined /> Voucher của tôi
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <Popconfirm
        title="Đăng xuất tài khoản"
        description="Bạn có muốn đăng xuất?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => dispatch(setLogout())}
      >
        <LogoutOutlined /> Đăng xuất
      </Popconfirm>
      ),
      key: "5",
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
          <div className="md:max-w-6xl md:flex md:mx-auto md:justify-between md:py-4">
            <div>
              <Link to={""}>
                <img src={logo} alt="" />
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
                  <Link to={""} className="hover:text-[#397EBA]">
                    THÀNH VIÊN
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>

      <main className="bg-[#F8F8F8]">
        <Outlet />
      </main>

      <footer className="mt-24">
        <hr />

        <div className="md:m-auto md:max-w-6xl md:py-4">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <div className="text-center md:text-left text-xs md:text-base">
              <Link to={""}>
                <img src={logo} alt="" className="h-12" />
              </Link>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Tuyển dụng</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Giới thiệu</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Liên hệ</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Liên hệ quảng cáo</Link>
              </h2>
              <h2 className="md:px-4 md:pt-2 hover:text-[#397EBA]">
                <Link to={""}>Hướng dẫn đặt vé online</Link>
              </h2>
            </div>
            <div className="text-center md:text-left font-semibold text-lg text-[#333333] pt-4 md:pt-0">
              <h1>KẾT NỐI VỚI CHÚNG TÔI</h1>
            </div>
            <div className="text-center md:text-left">
              <h1 className="md:text-lg md:font-semibold text-[#333333]">
                LIÊN HỆ
              </h1>
              <h2 className="text-sm  text-[#333333] pt-2">
                CÔNG TY CỔ PHẦN BETA MEDIA
              </h2>
              <p className="text-[10px] pt-2">
                Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày
                08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
              </p>
              <p className="text-[10px] pt-2">
                Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp
                Bát, quận Hoàng Mai, thành phố Hà Nội
              </p>
              <p className="text-[10px] pt-2">Hotline: 1900 636807</p>
              <p className="text-[10px] pt-2">Email: cskh@betacorp.vn</p>
              <p className="font-semibold text-[#333333]  pt-2">
                Liên hệ hợp tác kinh doanh:
              </p>
              <p className=" pt-2 text-[13px]">Email: phuongdh@betagroup.vn</p>
              <p className=" pt-2 text-[13px]">Phone: +8490 666 9169</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutWebsite;
