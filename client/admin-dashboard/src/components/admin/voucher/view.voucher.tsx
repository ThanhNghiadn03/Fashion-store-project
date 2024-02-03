import { IVoucher } from "@/types/backend";
import { Badge, Descriptions, Drawer } from "antd";
import dayjs from 'dayjs';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IVoucher | null;
    setDataInit: (v: any) => void;
}
const ViewDetailVoucher = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;

    return (
        <>
            <Drawer
                title="Thông Tin voucher"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Mã voucher">{dataInit?.idVoucher}</Descriptions.Item>
                    <Descriptions.Item label="Loại voucher">{dataInit?.typeVoucher}</Descriptions.Item>
                    <Descriptions.Item label="Giảm giá">{dataInit?.discount}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataInit?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả voucher">{dataInit?.descriptionVoucher}</Descriptions.Item>
                    <Descriptions.Item label="Ngày bắt đầu">{dataInit && dataInit.startDate ? dayjs(dataInit.startDate).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày kết thúc">{dataInit && dataInit.endDate ? dayjs(dataInit.endDate).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailVoucher;