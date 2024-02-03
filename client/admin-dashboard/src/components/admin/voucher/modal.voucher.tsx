import { ModalForm, ProForm, ProFormDatePicker, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton, ProFormUploadDragger } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import { callCreateVoucher, callUpdateVoucher } from "@/config/api";
import { IVoucher } from "@/types/backend";
import { DatePicker } from "antd/lib";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IVoucher | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

const ModalVoucher = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit?._id) {
            // if (dataInit.company) {
            //     setCompanies([{
            //         // label: dataInit.company.name,
            //         // value: dataInit.company._id,
            //         // key: dataInit.company._id,
            //     }])
            // }
        }
    }, [dataInit])
    const submitVoucher = async (valuesForm: any) => {
        const {
            idVoucher,
            typeVoucher,
            discount,
            quantity,
            descriptionVoucher,
            startDate,
            endDate } = valuesForm;
        if (dataInit?._id) {
            //update
            const voucher = {
                _id: dataInit._id,
                idVoucher,
                typeVoucher,
                discount,
                quantity,
                descriptionVoucher,
                startDate,
                endDate 
            }

            const res = await callUpdateVoucher(voucher);
            if (res.data) {
                message.success("Cập nhật voucher thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const voucher = {
                idVoucher,
                typeVoucher,
                discount,
                quantity,
                descriptionVoucher,
                startDate,
                endDate
            }
            const res = await callCreateVoucher(voucher);
            if (res.data) {
                message.success("Thêm mới voucher thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật voucher" : "Tạo mới voucher"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitVoucher}
                initialValues={dataInit?._id ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Mã voucher"
                            name="idVoucher"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập tên voucher"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Loại voucher"
                            name="typeVoucher"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập loại voucher"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Giảm giá"
                            name="discount"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập giảm giá"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng voucher"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập số lượng voucher"
                        />
                    </Col>
                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormDigit
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập số lượng"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormUploadButton
                            title="upload"
                            label="upload"
                            name="imageProduct"
                        />
                    </Col> */}
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormTextArea
                            label="Mô tả voucher"
                            name="descriptionVoucher"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập mô tả voucher"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        {/* <ProFormDatePicker
                            label="Chọn ngày bắt đầu"
                            name="startDate"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            
                            placeholder="Ngày bắt đầu"
                        /> */}
                        
                        {/* <Form.Item label="Chọn ngày bắt đầu và kết thúc" rules={[{ required: true}]}>
                            <DatePicker 
                                name="startDate"
                                placeholder="Ngày bắt đầu"
                            />
                            <DatePicker 
                                name="endDate"
                                placeholder="Ngày kết thúc"
                            />
                        </Form.Item> */}
                        <Form.Item
                            label="Chọn ngày bắt đầu"
                            name="startDate"
                            rules={[{ required: true, message: 'Phải nhập ngày bắt đầu!' }]}
                        >
                            <DatePicker
                                placeholder="Ngày bắt đầu"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Chọn ngày kết thúc"
                            name="endDate"
                            rules={[{ required: true, message: 'Phải nhập ngày kết thúc!' }]}
                        >
                            <DatePicker
                                placeholder="Ngày kết thúc"
                            />
                        </Form.Item>
                    </Col>
                    {/* <Col lg={12} md={12} sm={24} xs={24}> */}
                        {/* <ProFormDatePicker
                            label="Chọn ngày kết thúc"
                            name="endDate"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Ngày kết thúc"
                        /> */}
                        {/* <DatePicker
                            // locale={locale}
                            name="startDate"
                            placeholder="Ngày kết thúc"
                        /> */}
                    {/* </Col> */}
                    {/* <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            disabled={dataInit?._id ? true : false}
                            label="Password"
                            name="password"
                            rules={[{ required: dataInit?._id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col> */}
                    {/* <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Danh mục"
                            name="idCategory"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập id danh mục"
                        />
                    </Col> */}
                    {/* <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Họ"
                            name="lastName"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên họ"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập số điện thoại"
                        />
                    </Col> */}
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalVoucher;
