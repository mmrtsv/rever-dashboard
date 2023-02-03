import React from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@itsrever/design-system'
import CalendarIcon from '@mui/icons-material/DateRangeOutlined'
import moment from 'moment'

interface TopBarProps {
    currentPeriod: number
    setCurrentPeriod: (index: number) => void
}

const PeriodSelector: React.FC<TopBarProps> = ({
    currentPeriod,
    setCurrentPeriod
}) => {
    const dateTo = moment().format('YYYY-MM-DD')
    const dateFrom30d = moment().subtract(1, 'M').format('YYYY-MM-DD')
    const dateFrom7d = moment().subtract(7, 'd').format('YYYY-MM-DD')

    const theme = useTheme()
    return (
        <div className="flex">
            {/* <LeftTimeSelector
                selected={currentPeriod === 0}
                onClick={() => setCurrentPeriod(0)}
                textColor={theme.colors.primary.light}
                hoverColor={theme.colors.grey[5]}
                borderColor={theme.colors.grey[5]}
            >
                <CalendarIcon />
                <span className="ml-2">Custom</span>
            </LeftTimeSelector> */}
            <LeftTimeSelector
                selected={currentPeriod === 1}
                onClick={() => setCurrentPeriod(1)}
                textColor={theme.colors.primary.light}
                hoverColor={theme.colors.grey[5]}
                borderColor={theme.colors.grey[5]}
            >
                7D
            </LeftTimeSelector>
            <RightTimeSelector
                selected={currentPeriod === 2}
                onClick={() => setCurrentPeriod(2)}
                textColor={theme.colors.primary.light}
                hoverColor={theme.colors.grey[5]}
                borderColor={theme.colors.grey[5]}
            >
                30D
            </RightTimeSelector>
        </div>
    )
}

export default PeriodSelector

interface BoxProps {
    borderColor: string
    hoverColor: string
    selected: boolean
    textColor: string
}

const LeftTimeSelector = styled.div<BoxProps>`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border: 0.5px solid;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-color: ${(p) => (p.selected ? p.hoverColor : p.borderColor)};
    background-color: ${(p) => (p.selected ? p.hoverColor : '#fff')};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
    :hover {
        color: ${(p) => p.textColor};
        border-color: ${(p) => p.hoverColor};
        background-color: ${(p) => p.hoverColor};
    }
`

const RightTimeSelector = styled.div<BoxProps>`
    padding: 0.5rem;
    border: 0.5px solid;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-color: ${(p) => (p.selected ? p.hoverColor : p.borderColor)};
    background-color: ${(p) => (p.selected ? p.hoverColor : '#fff')};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
    :hover {
        color: ${(p) => p.textColor};
        border-color: ${(p) => p.hoverColor};
        background-color: ${(p) => p.hoverColor};
    }
`

const TimeSelector = styled.div<BoxProps>`
    padding: 0.5rem;
    border: 0.5px solid;
    border-color: ${(p) => (p.selected ? p.hoverColor : p.borderColor)};
    background-color: ${(p) => (p.selected ? p.hoverColor : '#fff')};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
    :hover {
        color: ${(p) => p.textColor};
        border-color: ${(p) => p.hoverColor};
        background-color: ${(p) => p.hoverColor};
    }
`
