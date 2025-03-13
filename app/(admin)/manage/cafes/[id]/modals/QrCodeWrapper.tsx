import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { setQrCodeState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import QRCode from "react-qr-code"

const QrCodeWrapper = ({cafeid}:{cafeid:string}) => {
    const state = useAppSelector(state => state.admin.showQR)
    const dispatch = useAppDispatch()
    const encodedCafeId = encodeURIComponent(cafeid)
    return (
        <Modal show={state} >
            <ModalHeader onClose={() => dispatch(setQrCodeState(false))}>
                <h1>QR Code</h1>
            </ModalHeader>
            <ModalBody>
                <div className="w-full">
                    <div className="flex justify-center flex-wrap">
                        <div className="pt-24 w-max">
                            <QRCode  value={`https://gappy.ir/cafe/${encodedCafeId}`} />
                        </div>

                        <div className="pt-8 p-4 text-center">
                            <span>با اسکن QR کاربر به صفحه کافه شما منتقل میشود. شما میتوانید خودتان آن را پرینت بگیرید یا از وبسایت گپی سفارش منو بدهید.</span>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default QrCodeWrapper