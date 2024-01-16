import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  UploadProps,
} from "antd";
import dayjs from "dayjs";
import { Button, message } from "antd";
import {  useState } from "react";
import { useNavigate } from "react-router";
import { useAddMovieMutation } from "../../../redux/api/movieApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import swal from "sweetalert";
import { useGetAllGenresQuery } from "../../../redux/api/genresApi";
import { useGetAllActorQuery } from "../../../redux/api/actorsApi";
import { useGetAllDirectorsQuery } from "../../../redux/api/directorApi";

const AddMovies = () => {
  const [addMovies, { isLoading: isAddLoading }] = useAddMovieMutation();
  const {data:genres} = useGetAllGenresQuery()
  const {data:actors} = useGetAllActorQuery()
  const {data:directors} = useGetAllDirectorsQuery()
  const [urlImage, setUrlImage] = useState<string>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const Format = "YYYY/MM/DD HH:mm:ss";
  const onFinish = (value) => {
    addMovies({
      ...value,
      image: urlImage,
      release_date: dayjs(value.release_date).format(Format),
    })
      .unwrap()
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm phim thành công!", "success");
        navigate("/admin/movies");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm phim thất bại , Vui lòng thử lại !", "error");
      });
  };

  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    data: { upload_preset: "upload" },
    onChange(info) {
      if (info.file.status === "done") {
        setUrlImage(info.file.response.url);
        message.open({
          type: "success",
          content: "Upload ảnh thành công",
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Thêm Phim Mới </h2>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item
            label="Tên phim"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input placeholder="Tên phim ..." />
          </Form.Item>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Title không được để trống" }]}
          >
            <Input placeholder="Tiêu đề phim" />
          </Form.Item>
          <Form.Item
            label="Thể Loại"
            name="genres"
            rules={[
              { required: true, message: "Thể loại không được để trống" },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={genres?.data?.map((item: IGenre) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[{ required: true, message: "Trailer không được để trống" }]}
          >
            <Input placeholder="Trailer phim..." />
          </Form.Item>
          <Form.Item
            label="Thời lượng"
            name="duration"
            rules={[
              { required: true, message: "Thời lượng không được để trống" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Thời lượng phim..."
            />
          </Form.Item>
          <Form.Item
            label="Ảnh phim"
            name="image"
            rules={[{ required: true, message: "Ảnh không được để trống" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea placeholder="Mô tả phim..." size={`large`} />
          </Form.Item>
          <Form.Item
            label="Ngày khởi chiếu"
            name="release_date"
            rules={[
              {
                required: true,
                message: "Ngày khởi chiếu không được để trống",
              },
            ]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Đạo Diễn"
            name="director_id"
            rules={[
              { required: true, message: "Đạo diễn không được để trống" },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Đạo diễn phim ..."
              options={directors?.data?.map((item: IDirector) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Status không được để trống" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Trạng thái phim ..."
              options={[
                { value: "screening", label: "Đang chiếu" },
                { value: "unscreen", label: "Đã chiếu" },
                { value: "upcoming", label: "Sắp chiếu" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label=" Diễn viên"
            name="actors"
            rules={[
              { required: true, message: "Diễn viên không được để trống" },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              options={actors?.data?.map((item: IActor) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item label="Tác vụ">
            <Button htmlType="submit">
              {isAddLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default AddMovies;
