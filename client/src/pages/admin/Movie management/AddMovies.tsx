import { DatePicker, Form, Input, TimePicker, Select, Space } from 'antd';
import { Button, message } from 'antd';





export default function AddMovies() {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Thêm phim thành công',
          className: 'custom-class',
          style: {
            marginTop: '0vh',
          },
        });
      };

    return (
        <div className='addFilmAdmin'>
            <h2 className='text-xl uppercase font-bold mb-4'>Thêm Phim Mới </h2>
            <Form
                // onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
            >
                <Form.Item label="Tên phim">
                    <Input name='name' />
                </Form.Item>
                <Form.Item label="Thể Loại">
                    <Select
                        defaultValue="Chọn thể Loại"
                        style={{ width: 200 }}

                        options={[
                            {
                                label: 'Chọn thể loại',
                                options: [
                                    { label: 'Tâm Lý ', value: 'Tâm Lý' },
                                    { label: 'Hành Động', value: 'Hành Động' },
                                    { label: 'Tình Cảm', value: 'Tình Cảm' },
                                    { label: 'Hoạt Hình', value: 'Hoạt Hình' },
                                ],
                            },

                        ]}
                    />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' />
                </Form.Item>
                <Form.Item label="image">
                    <input type="file" /> <br />

                </Form.Item>
                <Form.Item label="description">
                    <Input name='description' />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} name='release_date' /><TimePicker />
                </Form.Item>
                <Form.Item label="Đạo Diễn">
                    <Input name='director_id' />
                </Form.Item>
                <Form.Item label=" Diễn viên">
                    <Input name='actors' />
                </Form.Item>

                <Form.Item label="Tác vụ">
                <>
      {contextHolder}
      <Button onClick={success}>Thêm Phim </Button>
    </>
                </Form.Item>
            </Form>
           
        </div>
    );
};
