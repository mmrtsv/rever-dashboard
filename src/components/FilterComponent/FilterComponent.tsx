import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'

interface SearchProps {
    freeText: string
    setFreeText: (freeText: string) => void
}

const FilterComponent: React.FC<SearchProps> = ({ freeText, setFreeText }) => {
    const { t } = useTranslation()

    return (
        <FilterBox>
            <TextField
                sx={{
                    '& label.Mui-focused': {
                        color: 'black'
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#24446D'
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#24446D',
                            backgroundColor: '#24446d4e'
                        },
                        '&:hover fieldset': {
                            borderColor: '#24446D'
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#24446D',
                            backgroundColor: 'transparent'
                        }
                    }
                }}
                label={
                    <div>
                        <SearchIcon
                            style={{ color: '#24446D' }}
                            fontSize="medium"
                        />{' '}
                        {t('search_component.search')}
                    </div>
                }
                data-testid="search-input"
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
    padding-top: 1rem;
    padding-bottom: 1rem;
`

export default FilterComponent
