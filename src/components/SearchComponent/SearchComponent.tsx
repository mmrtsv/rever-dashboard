import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@itsrever/design-system'

interface SearchProps {
    freeText: string
    setFreeText: (freeText: string) => void
    rowCount: number | undefined
}

const FilterComponent: React.FC<SearchProps> = ({
    freeText,
    setFreeText,
    rowCount
}) => {
    const { t } = useTranslation()
    const theme = useTheme()

    return (
        <>
            <FilterBox>
                <TextField
                    data-testid="SearchInput"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
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
                        <p>
                            <SearchIcon
                                style={{ color: theme.colors.primary.dark }}
                                fontSize="medium"
                            />{' '}
                            {t('search_component.search')}
                        </p>
                    }
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                />
            </FilterBox>
            {freeText.length > 2 && (
                <>
                    <hr
                        className="mb-2"
                        style={{
                            border: `0.5px solid ${theme.colors.grey[2]}`
                        }}
                    />
                    <p className="text-xs">
                        {rowCount
                            ? t('search_component.results') + rowCount
                            : t('search_component.results') + '0'}
                    </p>
                </>
            )}
        </>
    )
}

export default FilterComponent

const FilterBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
