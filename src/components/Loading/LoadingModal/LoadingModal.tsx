import React from 'react'
import { ClipLoader } from 'react-spinners'
import { useTheme, Modal } from '@itsrever/design-system'

interface LoadingModalProps {
    loading: boolean
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ loading }) => {
    const theme = useTheme()

    return (
        <>
            {loading && (
                <Modal isOpen={loading} onRequestClose={() => null}>
                    <div className="flex items-center">
                        <ClipLoader
                            loading={loading}
                            color={theme.colors.primary.dark}
                            size="125px"
                        />
                    </div>
                </Modal>
            )}
        </>
    )
}

export default LoadingModal
