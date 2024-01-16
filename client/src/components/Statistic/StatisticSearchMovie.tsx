import React, { useRef, useState } from "react";
import { useSearchTopMovieQuery } from "../../redux/api/statisticApi";
import { Button, Input, InputRef, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatCurrency } from "../../utils/formatVND";
import { FilterConfirmProps } from "antd/es/table/interface";
import { ColumnType } from "antd/es/list";
import { SearchOutlined } from "@ant-design/icons";
type DataIndex = keyof DataType;

const StatisticSearchMovie = () => {
  const { data: MovieSearch } = useSearchTopMovieQuery();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
  const dataSource = MovieSearch?.data?.map((items) => {
    return {
      key: items?.id,
      name: items.name,
      image: items.image,
      status: items.status,
      total_booking: items.total_booking,
      total_revenue: items.total_revenue,
    };
  });
  const columns: ColumnsType<any> = [
    {
      title: "Tên Phim",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      render: (name) => <span className="line-clamp-2">{name}</span>,
      ...getColumnSearchProps("name")
    },
    {
      title: "Ảnh ",
      dataIndex: "image",
      key: "image",
      align: "center",
      fixed: "left",
      render: (image) => <img className="w-20 mx-auto" src={image} alt="" />,
    },
    {
      title: "Trạng thái ",
      dataIndex: "status",
      key: "status",
      align: "center",
      fixed: "left",
      render: (status) => (
        <p>
          {status === "upcoming"
            ? "Sắp chiếu"
            : status === "screening"
            ? "Đang chiếu"
            : "Đã chiếu"}
        </p>
      ),
    },
    {
      title: "Tổng đơn",
      dataIndex: "total_booking",
      key: "total_booking",
      align: "center",
      render: (total_booking) => <p>{total_booking} đơn </p>,
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "total_revenue",
      key: "total_revenue",
      align: "center",
      render: (total_revenue) => <p className="text-xl ">{formatCurrency(total_revenue)}</p>,
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default StatisticSearchMovie;
