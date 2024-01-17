import React, { useState } from "react";
import { Badge, Button, Modal, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useGetAllSeatTypeQuery, useGetSeatTypeSoftQuery, useSoftDeleteSeatTypeMutation } from "../../../redux/api/seatApi";
import { formatCurrency } from "../../../utils/formatVND";
import swal from "sweetalert";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  price: string | number;
  imgae: string;
}

const SeatTypeMng = () => {
  const { data: seatTypes } = useGetAllSeatTypeQuery();
  const [softDelete] = useSoftDeleteSeatTypeMutation();
  const {data:softData} = useGetSeatTypeSoftQuery()
  const [isModalOpenGarbage,SetIsModalOpenGarbage] = useState(false)

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên thể loại ghế",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Giá thể loại ghế",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => <p>{formatCurrency(price)}</p>,
    },
    {
      title: "Ảnh thể loại ghế",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img) => <img className="w-20 mx-auto" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/seats/${id}/edit`}>
            <Button icon={<AiFillEdit />} />
          </Link>
          <div>
            <Popconfirm
              title="Ẩn loại ghế"
              description="Bạn có chắc chắn muốn ẩn loại ghế này không"
              onConfirm={() => {
                softDelete({ seat_type_id: id }).then(() => {
                  swal("Thành công!", "Ẩn ghế thành công!", "success")
                }).catch(()=>{
                  swal("Thất bại!", "Ẩn ghế thành công thất bại , Vui lòng thử lại !", "error");
                });
              }}
              okText="Có"
              cancelText="Không"
              okType="default"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];
  const data: DataType[] = seatTypes?.data?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
      price: item?.price,
      image: item?.image,
    };
  });
    const columnsSoft: ColumnsType<DataType> = [
      {
        title: "Tên đạo diễn",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Giá ghế",
        dataIndex: "price",
        key: "price",
        render:(price)=> <p>{formatCurrency(price)}</p>
      },
      {
        title: "Ảnh đạo diễn",
        dataIndex: "image",
        key: "image",
        render: (img) => <img className="w-20" src={img} alt="anh" />,
      },
      {
        title: "Hành động",
        key: "action",
        render: ({ key: id }: { key: number | string }) => (
          <div className="space-x-3">
            <Popconfirm
              title="Khôi phục đạo diễn"
              description="Bạn có chắc muốn khôi phục?"
              onConfirm={() =>
                softDelete({ seat_type_id: id })
                  .unwrap()
                  .then(() => {
                    swal("Thành công!", "Khôi phục  thành công!", "success")
                  }).catch(()=>{
                    swal("Thất bại!", "Khôi phục  thất bại , Vui lòng thử lại !", "error");
                  })
              }
              okText="Yes"
              okType="default"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button icon={<FaTrashRestore />} />
            </Popconfirm>
            {/* <Popconfirm
              title="Xóa đạo diễn vĩnh viễn"
              description="Bạn có chắc muốn xóa?"
              // onConfirm={() =>
              //   softDeleteBooking({booking_id: id})
              //     .unwrap()
              //     .then(() => {
              //       notification.success({
              //         message: "Delete booking sucessfuly!",
              //       });
              //       dispatch(setBookingSoftDelete(_))
              //     })
              // }
              okText="Yes"
              okType="default"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button icon={<FcDeleteDatabase />} />
            </Popconfirm> */}
          </div>
        ),
      },
    ];

    const dataSoft: DataType[] = softData?.data?.map((item) => {
      return {
        key: item?.id,
        name: item?.name,
        price:item?.price,
        image: item?.image,
      };
    });
    const handleCancelGarbage = () => {
      SetIsModalOpenGarbage(false);
    };
    const OpentModalGarbage = () => {
      SetIsModalOpenGarbage(true);
    };
  return (
    <>
      <div>
        <div className="md:flex justify-between items-center">
          <Button>
            <Link to={"/admin/seats/add"}>Thêm loại ghế</Link>
          </Button>
          <div className="">
              <Badge count={softData?.data?.length} size="small">
                <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                  Danh sách loại ghế đã ẩn
                </Button>
              </Badge>
              <Modal
                title="Danh sách ghế đã ẩn"
                open={isModalOpenGarbage}
                onCancel={handleCancelGarbage}
                footer={null}
                width={800}
              >
                <Table
                  dataSource={dataSoft}
                  columns={columnsSoft}
                />
              </Modal>
            </div>
        </div>
        <h1 className="text-2xl mb-6 mt-2 bg-white p-4 rounded-md shadow-md text-[#0D5D9F]">
          Danh sách loại ghế
        </h1>
        <Table
          columns={columns}
          dataSource={data}
          className="bg-white p-4 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default SeatTypeMng;
