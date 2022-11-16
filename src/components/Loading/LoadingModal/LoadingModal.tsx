import React from 'react'
import { ClipLoader } from 'react-spinners'
import { Modal as ReactModal } from 'react-responsive-modal'
import styled from 'styled-components'

interface LoadingModalProps {
    loading: boolean
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ loading }) => {
    return (
        <>
            {loading && (
                <ReactModal
                    open={loading}
                    onClose={() => null}
                    center
                    showCloseIcon={false}
                >
                    <ReverModal>
                        <ClipLoader
                            loading={loading}
                            size="125px"
                            color="#24446D"
                        />
                    </ReverModal>
                </ReactModal>
            )}
        </>
    )
}

export default LoadingModal

const ReverModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 2rem;
    border: 1px #e5e5e5 solid;
    border-radius: 16px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
    background-color: white;
`
