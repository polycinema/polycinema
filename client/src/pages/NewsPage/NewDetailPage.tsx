import { Form, Link } from "react-router-dom";
import newdetail from "../../../public/img/newDetail.png";
import newdetail1 from "../../../public/img/newDetail1.jpg";
import newdetail2 from "../../../public/img/newDetail2.jpg";
import newdetail3 from "../../../public/img/newDetail3.png";
import newdetail4 from "../../../public/img/newDetail4.png";
import { Button, Input } from "antd";

const NewDetailPage = () => {
  return (
    <div className="md:grid md:grid-cols-2 m-auto md:max-w-6xl md:pt-8 pt-5">
      <div className="px-4">
        <h1 className="text-lg font-bold">
          TÍCH ĐIỂM Poly QUA VANI - NHẬN NGAY VOUCHER 20% HIGHLANDS COFFEE
        </h1>
        <Link to={""}>
          <img className="h-96 pt-5 " src={newdetail} alt="" />
        </Link>
        <p className="md:pt-5 md:text-lg pt-3">
          Poly Cinemas phối hợp cùng Highlands Coffee (HLC) với ưu đãi cực sốc:
        </p>
        <p className="md:text-sm pt-2">
          + Từ ngày 13/11 - 10/12/2023, Khách hàng tại Beta: Khách hàng tích
          điểm qua app VANI tại Poly sẽ nhận 1 VOUCHER GIẢM 20% TỐI ĐA 20K của
          Highlands Coffee (HLC).
        </p>
        <p className="md:text-sm pt-2">
          + Từ ngày 11/12/2023 - 07/01/2024, Khách hàng tại Highlands Coffee:
          Khách hàng quét mã VANI tại Highlands Coffee sẽ nhận 1 lượt quay Lucky
          Wheel - 100% trúng giải với VOUCHER Bắp Free 32oz Beta.
        </p>
        <div>
          <h1 className="font-bold text-lg pt-4">Điều kiện áp dụng :</h1>
          <h2>1. Điều kiện quét mã tại Poly</h2>
          <p className="pt-2 md:text-sm">
            + Khách hàng đã là thành viên của Poly Cinemas và đã liên kết với
            app Vani;
          </p>
          <p className="pt-2 md:text-sm">
            + Khách hàng phải có phát sinh giao dịch và thực hiện đúng theo
            hướng dẫn trong thời gian diễn ra của chương trình. Chỉ cần phát
            sinh giao dịch kể cả giao dịch sử dụng invitation/ staff A/ Staff B
            hay hoá đơn có giá trị tối thiểu đều được nhận tem.
          </p>
          <p className="pt-2 md:text-sm">
            + Mỗi khách hàng chỉ được nhận tối đa 2 VOUCHER HLC GIẢM 20% (tối đa
            20k) trong toàn bộ chương trình và không giới hạn hoá đơn giá trị
            tối thiểu.
          </p>
          <p className="pt-2 md:text-sm">
            +Voucher được nhận trực tiếp tại quầy.
          </p>
          <p className="pt-2 md:text-sm">
            + Voucher được nhận trực tiếp tại quầy.
          </p>
          <p className="pt-4 md:text-sm">
            Lưu ý: Giảm 20% (tối đa là 20K) trên các hoá đơn giao dịch tại
            Highlands Coffee kể cả với các hoá đơn có giá trị cao vẫn chỉ được
            giảm 20K.
          </p>
          <h2 className="pt-2">2. Điều kiện sử dụng Voucher Bắp Free 32oz tại Poly: </h2>
          <p className="pt-2 md:text-sm"> + Áp dụng cho tất cả khách hàng là thành viên của Poly Cinemas;</p>
          <p className="pt-2 md:text-sm"> + Voucher có hiệu lực 45 ngày kể từ ngày phát hành.</p>
          <p className="pt-2 md:text-sm"> + Voucher có thể được áp dụng vào các ngày lễ, Tết hoặc các suất chiếu đặc biệt, phim khởi chiếu sớm.</p>
          <p className="pt-2 md:text-sm"> + Không áp dụng cho các Group Sale hoặc Private Show có áp dụng chính sách ưu đãi giá vé.</p>
          <p className="pt-2 md:text-sm"> + Không áp dụng cho suất chiếu sớm, suất chiếu đặc biệt.</p>
          <h1 className="font-blod text-lg pt-4">Comments</h1>
        <Form className="mt-2 flex">
         <Input placeholder="Add a comment"></Input>
         <Button className="mx-2">Post</Button>
        </Form>
        <br />
        </div>

      </div>

      <div className="md:grid md:grid-cols-4 md:gap-8 px-4">
        <div>
          <h1 className="font-bold md:text-lg">TIN TỨC KHÁC</h1>
          <Link to={""}>
            <img className="md:h-30 pt-5 " src={newdetail2} alt="" />
          </Link>
          <Link to={""}>
            <p className="hover:underline underline-offset-1 md:text-sm text-center pt-3">
              TUẦN PHIM SINH TỬ - ƯU ĐÃI CHẤT LỪ
            </p>
          </Link>
        </div>
        <div>
          <Link to={""}>
            <img className="h-30 pt-12 " src={newdetail1} alt="" />
          </Link>
          <Link to={""}>
            <p className="hover:underline underline-offset-1 md:text-sm text-center pt-3">
              BETA TRMALL PHÚ QUỐC CHÍNH THỨC KHAI TRƯƠNG
            </p>
          </Link>
        </div>
        <div>
          <Link to={""}>
            <img className="h-30 pt-12 " src={newdetail3} alt="" />
          </Link>
          <Link to={""}>
            <p className="hover:underline underline-offset-1 md:text-sm text-center pt-3">
              XẢ ĐIỂM HẾT MÌNH - ƯU ĐÃI BẤT THÌNH LÌNH
            </p>
          </Link>
        </div>
        <div>
          <Link to={""}>
            <img className="h-30 pt-12 " src={newdetail4} alt="" />
          </Link>
          <Link to={""}>
            <p className="hover:underline underline-offset-1 md:text-sm text-center pt-3">
              THAY ĐỔI CHÍNH SÁCH ĐIỂM THÀNH VIÊN TỪ
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewDetailPage;
