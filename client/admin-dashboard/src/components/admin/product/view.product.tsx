import { IProduct } from "@/types/backend";
import { Badge, Card, Col, Descriptions, Divider, Drawer } from "antd";
import dayjs from 'dayjs';
import { useState } from "react";
import styles from 'styles/client.module.scss';

<style>
    img {
    }
</style>

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IProduct | null;
    setDataInit: (v: any) => void;
}
const ViewDetailProduct = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    // const [displayProduct, setDisplayProduct] = useState<IProduct[] | null>(null);

    return (
        <>
            <Drawer
                title="Thông Tin sản phẩm"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"60vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={1} layout="vertical">
                    <Descriptions.Item label="Tên sản phẩm">{dataInit?.nameProduct}</Descriptions.Item>
                    <Descriptions.Item label="Đơn giá">{dataInit?.price}</Descriptions.Item>
                    <Descriptions.Item label="Giảm giá">{dataInit?.discount}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataInit?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả sản phẩm">{dataInit?.descriptionProduct}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ảnh sản phẩm">
                        {/* <Card
                            style={{ height: 50 }}
                            hoverable
                            cover={ */}
                        <div>
                            <img
                                alt="example"
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/products/${dataInit?.imageProduct}`}
                            />
                        </div>
                            {/* }
                        >
                        </Card> */}
                    </Descriptions.Item>
                    
                </Descriptions>
            </Drawer>
            
        </>
    )
}


export default ViewDetailProduct;