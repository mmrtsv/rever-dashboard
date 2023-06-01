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
                <Modal
                    isOpen={loading}
                    onRequestClose={() => null}
                    showBorder={false}
                >
                    <div className="flex items-center">
                        <ClipLoader
                            data-testid="spinner"
                            loading={loading}
                            color={theme.colors.primary.dark}
                            size="100px"
                        />
                    </div>
                </Modal>
            )}
        </>
    )
}

export default LoadingModal
