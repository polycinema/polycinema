import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { pause } from '../../../utils/pause';
import { IGenre, addGenre, getGenreById, updateGenre } from '../../../api/genre';
type FieldType = {
        name?: string;
        
};
const EditGenre = (props: Props) => {
  const {id} = useParams()
  const [form] = Form.useForm()
  const [messageApi , contextHolder] = message.useMessage()
  const navigate = useNavigate();
  const [genre,setGenre] = useState<IGenre>()
  

        useEffect(()=>{
                (
                        async()=>{
                                try {
                                        const {data} = await getGenreById(id)                                        
                                        setGenre(data.data);
                                        
                                } catch (error) {
                                        console.log(error);
                                        
                                }
                        }
                )()

        },[])
        useEffect(() => {
          setFields();
        }, [genre]);
        const setFields = () => {
          form.setFieldsValue({
            id: genre?.id,
            name: genre?.name,
          });
        };
        
        


  const onFinish = (values) => {
          updateGenre({id:id,...values})
          .then(async()=>{
                  form.resetFields()
                  messageApi.open({
                          type:"success",
                          content:"Cập nhật thể loại thành công , Chuyển trang sau 3s"
                  })
                  await pause(3000)
                  navigate("/admin/genres")
          })
          .catch((err)=>{
                  console.log(err.message);
                  
          })
          
          
  };

  const onFinishFailed = (errorInfo:any) => {
          console.log('Failed:', errorInfo);
  };
  return (
    <>
                {contextHolder}
                <div>
                        <h1 className='text-4xl m-6'>Cập nhật thể loại phim</h1>
                        <Form
                                form={form}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                        >
                                <Form.Item<FieldType>
                                        label="Tên thể loại"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your genre!' }]}
                                >
                                        <Input />
                                </Form.Item>

                                

                                <Form.Item 
                                wrapperCol={{ offset: 8, span: 16 }}
                                label="Tác vụ :"
                                
                                >

                                        <Button 
                                        htmlType="submit">
                                                Cập nhật thể loại
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
                </>
  )
}

export default EditGenre