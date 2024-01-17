import React, { useRef, useState } from "react";

import {
  Badge,
  Button,
  Input,
  InputRef,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnType } from "antd/es/table";
import {
  useBlockAcountByIdMutation,
  useGetAcountBannedQuery,
  useGetAllAcountUsersQuery,
} from "../../../redux/api/acountApi";
import { MdAutoDelete } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import swal from "sweetalert";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  date_of_birth: string;
  role: string;
}
type DataIndex = keyof DataType;
const ListAcountUser = () => {
  const { data: acounts } = useGetAllAcountUsersQuery();
  const { data: acountBanned } = useGetAcountBannedQuery();
  const [blockAcount, { isLoading }] = useBlockAcountByIdMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text?.toString()),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      align:"center",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ảnh ",
      dataIndex: "image",
      key: "image",
      align:"center",
      render: (image) => (
        <img className="w-24 h-24 object-cover mx-auto rounded-full" src={image} alt="" />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      align:"center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/acount/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Block tài khoản"
              description="Bạn có chắc chắn muốn block tài khoản?"
              okText="Có"
              okType="default"
              cancelText="Không"
              onConfirm={() => {
                blockAcount({ user_id: id }).then(() => {
                  messageApi.open({
                    type: "success",
                    content: "Block khoản thành công",
                  });
                });
              }}
            >
              <Button danger>
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Block"
                )}{" "}
              </Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const dataConfig: DataType[] = acounts?.data?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
      email: item?.email,
      phone: item?.phone,
      image: item?.image,
      gender: item?.gender,
      date_of_birth: item?.date_of_birth,
      role: item?.role,
    };
  });
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const dataSource = acountBanned?.data?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
      email: item?.email,
      phone: item?.phone,
      image: item?.image,
      gender: item?.gender,
      date_of_birth: item?.date_of_birth,
      role: item?.role,
    };
  });
  const columnBanned = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      align:"center",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ảnh ",
      dataIndex: "image",
      key: "image",
      align:"center",
      render: (image) => (
        <img className="w-24 h-24 object-cover mx-auto rounded-full" src={image} alt="" />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      align:"center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      render: (_: any, { key: id }: any) => (
        <div className="space-x-3">
          <Popconfirm
            title="Bỏ chặn tài khoản"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              blockAcount({ user_id: id })
                .unwrap()
                .then(() => {
                  swal(
                    "Thành công!",
                    "Bỏ chặn tài khoản thành công!",
                    "success"
                  );
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Bỏ chặn tài khoản thất bại , Vui lòng thử lại !",
                    "error"
                  );
                })
            }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div>
        <div className="flex justify-between">
          <Button className="m-2">
            <Link to={"/admin/addAcount"}>Thêm Tài Khoản Mới</Link>
          </Button>

          <div>
            <Badge count={acountBanned?.data?.length} size="small">
              <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                Tài khoản bị chặn
              </Button>
            </Badge>
            <Modal
              title="Danh sách tài khoản đã chặn"
              open={isModalOpenGarbage}
              onCancel={handleCancelGarbage}
              footer={null}
              width={1100}
            >
              <Table dataSource={dataSource} columns={columnBanned} />;
            </Modal>
          </div>
        </div>
        <h1 className="text-2xl mb-6 text-[#0D5D9F] bg-white p-2 rounded-md shadow-md">
          Danh sách tài khoản khách hàng
        </h1>
        <Table
          columns={columns}
          dataSource={dataConfig}
          className="bg-white p-2 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ListAcountUser;
