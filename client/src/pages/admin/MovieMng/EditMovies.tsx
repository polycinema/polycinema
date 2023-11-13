import { DatePicker, Form, Input, TimePicker, Select, Space, SelectProps, Upload, InputNumber, UploadProps } from 'antd';
import { Button, message } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router';
import { useGetMovieByIdQuery, useUpdateMovieMutation } from '../../../redux/api/movieApi';
import { useEffect, useState } from 'react';
import { IActor, getAllActor } from '../../../api/actor';
import { IGenre, getAllGenre } from '../../../api/genre';
import { IDirector, getAllDirector } from '../../../api/director';
import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import { pause } from '../../../utils/pause';





const UpdateMovie = () => {
    const { id } = useParams()
    const { data: movie } = useGetMovieByIdQuery(id || "")
    const [update, { idLoading: isUpdateLoading }] = useUpdateMovieMutation()
    const [urlImage, setUrlImage] = useState<string>()
    const [actors, setActors] = useState<IActor[]>()
    const [genres, setGenres] = useState<IGenre[]>()
    const [directors, setDirectors] = useState<IDirector[]>()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data: dataActors } = await getAllActor()
                const { data: dataGenres } = await getAllGenre()
                const { data: dataDirector } = await getAllDirector()
                setActors(dataActors.data)
                setGenres(dataGenres.data)
                setDirectors(dataDirector.data)

            } catch (error) {
                console.log(error);

            }
        })()
    }, [])
    useEffect(() => {
        setFields();
    }, [movie]);
    const setFields = () => {
        form.setFieldsValue({
            id: movie?.data.id,
            name: movie?.data.name,
            title: movie?.data.title,
            actors: movie?.data.actors.map((item:IActor) => 
            (item.id)),
            genres: movie?.data.genres.map((item:IGenre) => 
            (item.id)),
            trailer: movie?.data.trailer,
            description: movie?.data.description,
            duration: movie?.data.duration,
            director_id: movie?.data.director_id,
            release_date: dayjs(movie?.data.release_date, "YYYY/MM/DD HH:mm:ss")

        });
    };

    const onFinish = (value:any) => {
        urlImage === undefined ?
            update({
                ...value,
                image: movie.data.image,
                id:id,
                release_date:
                    dayjs(value.release_date).format("YYYY/MM/DD HH:mm:ss")
            }).unwrap()
                .then(async () => {
                    form.resetFields()
                    messageApi.open({
                        type: "success",
                        content: "Thêm sản phẩm thành công . Chuyển trang sau 3s"
                    });
                    await pause(3000);
                    navigate("/admin/movies");


                })
                .catch(() => {
                    messageApi.open({
                        type: "error",
                        content: "Thêm sản phẩm thất bại vui lòng thử lại"
                    })
                }) : update({
                    ...value,
                    image: urlImage,
                    id:id,
                    release_date:
                        dayjs(value.release_date).format("YYYY/MM/DD HH:mm:ss")
                }).unwrap()
                    .then(async () => {
                        form.resetFields()
                        messageApi.open({
                            type: "success",
                            content: "Thêm sản phẩm thành công . Chuyển trang sau 3s"
                        });
                        await pause(3000);
                        navigate("/admin/movies");


                    })
                    .catch(() => {
                        messageApi.open({
                            type: "error",
                            content: "Thêm sản phẩm thất bại vui lòng thử lại"
                        })
                    })

    }
    const props: UploadProps = {
        name: 'file',
        action: 'https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload',
        data: { upload_preset: 'upload', },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setUrlImage(info.file.response.url)
                message.open({
                    type: 'success',
                    content: "Upload ảnh thành công"
                })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        defaultFileList: [
            {
                uid: '1',
                name: "Image",
                url: movie?.data.image,
                percent: 33,
            }
        ],
    };
    return (
        <>
            {contextHolder}
            <div className='addFilmAdmin'>
                <h2 className='text-xl uppercase font-bold mb-4'>Cập nhật phim</h2>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên phim"
                        name='name'
                        rules={[{ required: true, message: 'Tên không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name='title'
                        rules={[{ required: true, message: 'Title không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thể Loại"
                        name="genres"
                        rules={[{ required: true, message: 'Thể loại không được để trống' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            options={genres?.map((item: IGenre) => {
                                return {
                                    value: item.id, label: item.name
                                }
                            })}
                        />

                    </Form.Item>

                    <Form.Item
                        label="Trailer"
                        name='trailer'
                        rules={[{ required: true, message: 'Trailer không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thời lượng"
                        name='duration'
                        rules={[{ required: true, message: 'Thời lượng không được để trống' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="image"
                        name="image"
                        rules={[{ required: true, message: 'Ảnh không được để trống' }]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>

                    </Form.Item>
                    <Form.Item
                        label="description"
                        name='description'
                        rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Ngày khởi chiếu"
                        name='release_date'
                        rules={[{ required: true, message: 'Ngày khởi chiếu không được để trống' }]}
                    >

                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        label="Đạo Diễn"
                        name='director_id'
                        rules={[{ required: true, message: 'Đạo diễn không được để trống' }]}


                    >
                        <Select
                            style={{ width: 120 }}
                            options={directors?.map((item: IDirector) => {
                                return {
                                    value: item.id, label: item.name
                                }
                            })}

                        />
                    </Form.Item>
                    <Form.Item
                        label=" Diễn viên"
                        name='actors'
                        rules={[{ required: true, message: 'Diễn viên không được để trống' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            options={actors?.map((item: IActor) => {
                                return {
                                    value: item.id, label: item.name
                                }
                            })}
                        />
                        {/* <span >{movie?.data?.actors.map((item:IActor)=>(
                        <span>{item.name}</span>
                    ))}</span> */}
                    </Form.Item>


                    <Form.Item label="Tác vụ">

                        <Button htmlType='submit'>{isUpdateLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật Movie"
                        )} </Button>

                    </Form.Item>
                </Form>

            </div>
        </>
    );
};

export default UpdateMovie