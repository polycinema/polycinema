import { Form, Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import newdetail from "../../../public/img/newDetail.png";
import { Button, Input } from "antd";
import { INews, getNewsById } from "../../api/News";

const NewDetailPage = (props: any) => {
  const [loadNewDeatil, setloadNewDeatil] = useState<INews[]>()
  const {id} = useParams()
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getNewsById(id)
                    setloadNewDeatil(data.data);

                } catch (error) {
                    console.log(error)
                }
            }
        )()
    }, [])
  
  return (
    <div className="md:grid md:grid-cols-2 m-auto md:max-w-6xl md:pt-8 pt-5">
      <div className="px-4">
          <div>
             <h1 className="text-lg font-bold">
          {loadNewDeatil?.title}
        </h1>
        <Link to={""}>
          <img className="h-96 pt-5 w-full object-cover " src={loadNewDeatil?.image} alt="" />
        </Link>
        <p className="md:pt-5 md:text-lg pt-3">
          {loadNewDeatil?.summary}
        </p>
        <p className="md:text-sm pt-2">
          + {loadNewDeatil?.description}
        </p>
          </div>
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
    </div>
  );
};

export default NewDetailPage;
