import {
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  InputNumber,
  UploadProps,
} from "antd";
import { Button, message } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import {
  useGetMovieByIdQuery,
  useUpdateMovieMutation,
} from "../../../redux/api/movieApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { useGetAllGenresQuery } from "../../../redux/api/genresApi";

const UpdateMovie = () => {
  const { id } = useParams();
  const { data: movie } = useGetMovieByIdQuery(id || "");
  const {data:genres} = useGetAllGenresQuery()
  const {data:actors} = useGetAllGenresQuery()
  const {data:directors} = useGetAllGenresQuery()
  const [update, { isLoading: isUpdateLoading }] = useUpdateMovieMutation();
  const [urlImage, setUrlImage] = useState<string>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  
  useEffect(() => {
    setFields();
  }, [movie]);
  const setFields = () => {
    form.setFieldsValue({
      id: movie?.data.id,
      name: movie?.data.name,
      title: movie?.data.title,
      actors: movie?.data?.actors?.map((item) => item?.id),
      genres: movie?.data?.genres?.map((item) => item?.id),
      trailer: movie?.data?.trailer,
      description: movie?.data?.description,
      duration: movie?.data?.duration,
      status: movie?.data?.status,
      director_id: movie?.data?.director_id,
      release_date: dayjs(movie?.data.release_date, "YYYY/MM/DD HH:mm:ss"),
    });
  };

  const onFinish = (value: any) => {
    urlImage === undefined
      ? update({
          ...value,
          image: movie.data.image,
          id: id,
          release_date: dayjs(value.release_date).format("YYYY/MM/DD HH:mm:ss"),
        })
          .unwrap()
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Cập nhật phim thành công!", "success");
            navigate("/admin/movies");
          })
          .catch(() => {
            swal("Thất bại!", "Cập nhật phim thất bại , Vui lòng thử lại !", "error");
          })
      : update({
          ...value,
          image: urlImage,
          id: id,
          release_date: dayjs(value.release_date).format("YYYY/MM/DD HH:mm:ss"),
        })
          .unwrap()
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Cập nhật phim thành công!", "success");
            navigate("/admin/movies");
          })
          .catch(() => {
            swal("Thất bại!", "Cập nhật phim thất bại , Vui lòng thử lại !", "error");
          })
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
    defaultFileList: [
      {
        uid: "1",
        name: "Image",
        url: movie?.data.image,
        percent: 33,
      },
    ],
  };
  return (
    <>
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Cập nhật phim</h2>
        <Form
          form={form}
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Title không được để trống" }]}
          >
            <Input />
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
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Trailer không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời lượng"
            name="duration"
            rules={[
              { required: true, message: "Thời lượng không được để trống" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Ảnh phim" name="image">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Mô tả không được để trống" }]}
          >
            <Input.TextArea size="large" />
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
              {isUpdateLoading ? (
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

export default UpdateMovie;
