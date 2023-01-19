import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'

interface SearchProps {
    freeText: string
    setFreeText: (freeText: string) => void
}

const FilterComponent: React.FC<SearchProps> = ({ freeText, setFreeText }) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <FilterBox>
            <TextField
                data-testid="SearchInput"
                sx={{
                    '& label.Mui-focused': {
                        color: theme.colors.common.black
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: theme.colors.primary.dark
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.colors.primary.dark,
                            backgroundColor: 'transparent'
                        },
                        '&:hover fieldset': {
                            borderColor: theme.colors.primary.dark
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.colors.primary.dark,
                            backgroundColor: 'transparent'
                        }
                    }
                }}
                label={
                    <div>
                        <SearchIcon
                            style={{ color: theme.colors.primary.dark }}
                            fontSize="medium"
                        />{' '}
                        {t('search_component.search')}
                    </div>
                }
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
            />
        </FilterBox>
    )
}

const FilterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default FilterComponent
