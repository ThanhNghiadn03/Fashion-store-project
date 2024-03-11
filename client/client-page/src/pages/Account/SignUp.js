import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { s4mlogo } from "../../assets/images";
import { Button, Divider, Form, Input, Row, Select, message, notification } from 'antd';
import { Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const { Option } = Select;

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const onFinish = async (values) => {
    const{
        fullName,
        email,
        password,
        dateOfBirth,
        gender,
        phoneNumber
    } = values;
    setIsSubmit(true);
    const res = await axios.post('http://localhost:6969/customers/create',{fullName,email,password,dateOfBirth,gender, phoneNumber});
    setIsSubmit(false);
    if (res?.data?.data?._id) {
        message.success('Đăng ký tài khoản thành công!');
        navigate('/signin');
    } else {
        notification.error({
            message: "Có lỗi xảy ra",
            description:
                res.message && Array.isArray(res.message) ? res.message[0] : res.message,
            duration: 5
        })
    }
}
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/3 hidden lgl:inline-flex h-full text-white">
      <div className="w-[450px] h-full bg-[#C6DCBA] px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={s4mlogo} alt="logoImg" className="w-70" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium text-[#070F2B]">
              Đăng ký tài khoản thành viên S4M
            </h1>
          </div>
        </div>
      </div>
      {/* <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center"> */}
      <div className="w-full lgl:w-2/3 h-full">
        <div>
          
        < Form
            // name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
                {/* <h2> Đăng Ký Tài Khoản </h2> */}
                <Title level={2}>Đăng ký tài khoản</Title>
                            < Divider />
            </Form.Item>
            <Form.Item
              // labelCol={{ span: 24 }} //whole column
              label="Họ tên"
              name="fullName"
              rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              // labelCol={{ span: 24 }
              // } //whole column
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống!' }]}
            >
              <Input type='email' />
            </Form.Item>

            <Form.Item
              // labelCol={{ span: 24 }} //whole column
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              // labelCol={{ span: 24 }} //whole column
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              // labelCol={{ span: 24 }} //whole column
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Ngày sinh không được để trống!' }]}
            >
              <Input type='date' />
            </Form.Item>


            <Form.Item
              // labelCol={{ span: 24 }} //whole column
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: 'Giới tính không được để trống!' }]}
            >
              <Select
                // placeholder="Select a option and change input text above"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
            < Form.Item
            wrapperCol={{ offset: 6, span: 16 }}
            >
              <Button type="primary" htmlType="submit" loading={isSubmit} style={{backgroundColor: "blue"}}>
                Đăng ký
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Divider> Or </Divider>
              <p className="text text-normal" > Đã có tài khoản ?
                <span>
                  <Link to='/signin' > Đăng Nhập </Link>
                </span>
              </p>
            </Form.Item>
            
          </Form>
        </div>
          
      </div>
    </div>
  );
};

export default SignUp;
