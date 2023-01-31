import Lottie from 'lottie-react'
import styled from 'styled-components'
import Success from './Success.json'

const SuccessAnimation = () => (
    <Box>
        <Lottie animationData={Success} className="h-[200px]" />
    </Box>
)

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    z-index: 1000;
`

export default SuccessAnimation
