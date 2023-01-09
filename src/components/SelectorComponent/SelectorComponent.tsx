import React from 'react'
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    ListItemText,
    Select,
    SelectChangeEvent
} from '@mui/material'
import { setSelectedEcommerce } from '../../redux/features/generalData/generalDataSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useTranslation } from 'react-i18next'
// import Checkbox from '@mui/material/Checkbox'

const SelectorComponent = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const ecommerceList = useAppSelector(
        (store) => store.generalData.ecommerceList
    )

    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200
            }
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'All') {
            dispatch(setSelectedEcommerce(undefined))
        } else {
            dispatch(setSelectedEcommerce(event.target.value))
        }
    }

    return (
        <FormControl sx={{ width: 200 }}>
            <InputLabel>{t('selector_component.label')}</InputLabel>
            {ecommerceList && (
                <Select
                    value={selectedEcommerce ?? ''}
                    onChange={handleChange}
                    input={
                        <OutlinedInput label={t('selector_component.label')} />
                    }
                    MenuProps={MenuProps}
                >
                    <MenuItem value={''}>
                        <ListItemText primary={'All'} />
                    </MenuItem>
                    {ecommerceList.map((name) => (
                        <MenuItem key={name} value={name}>
                            {/* <Checkbox checked={name === selectedEcommerce} /> */}
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    )
}

export default SelectorComponent
