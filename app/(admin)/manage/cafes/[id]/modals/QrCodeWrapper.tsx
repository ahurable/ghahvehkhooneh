import { Modal, ModalBody, ModalHeader } from "@/components/modals/modals"
import { setQrCodeState } from "@/lib/features/adminModalSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hook"
import QRCode from "react-qr-code"

const QrCodeWrapper = ({cafeid}:{cafeid:string}) => {
    const state = useAppSelector(state => state.admin.showQR)
    const dispatch = useAppDispatch()
    return (
        <Modal show={state} >
            <ModalHeader onClose={() => dispatch(setQrCodeState(false))}>
                <h1>QR Code</h1>
            </ModalHeader>
            <ModalBody>
                <div className="w-full">
                    <div className="flex justify-center">
                        <div className="p-4 w-full">
                            <QRCode value={`https://localhost:3000/cafe/${cafeid}`} />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default QrCodeWrapper