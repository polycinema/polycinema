import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

import { INews, getAllNews, removeNews } from "../../../api/News";

interface DataType {
  key: string;
  title: string;
  summary: string;
  description: string;
  image: string;
}
const ListPost = (props: Props) => {
  const [news, setNews] = useState<INews[]>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllNews();
        setNews(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tiêu đề tin tức",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Ảnh tin tức",
      dataIndex: "image",
      align: "center",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/news/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa tin tức"
              onConfirm={() => {
                removeNews(id).then(() => {
                  setNews(news?.filter((item: INews) => item.id !== id));
                  messageApi.open({
                    type: "success",
                    content: "Xóa tin tức thành công",
                  });
                });
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const data: DataType[] = news?.map((item: INews) => {
    return {
      key: item?.id,
      title: item?.title,
      summary: item?.summary,
      description: item?.description,
      image: item?.image,
    };
  });

  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/news/add"}>Thêm tin tức</Link>
        </Button>
        <h1 className="text-2xl mb-6 mt-2 text-[#0D5D9F] bg-white p-4 rounded-md shadow-md ">Danh sách tin tức</h1>
        <Table columns={columns} dataSource={data} className="bg-white p-4 rounded-md shadow-md" />
      </div>
    </>
  );
};

export default ListPost;
