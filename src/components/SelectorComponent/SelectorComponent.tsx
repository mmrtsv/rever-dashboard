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

const SelectorComponent = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const ecommerceList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
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
        dispatch(setSelectedEcommerce(event.target.value))
    }

    return (
        <>
            {ecommerceList && ecommerceList.length > 1 && (
                <FormControl data-testid="Selector" sx={{ width: 200 }}>
                    <InputLabel>{t('selector_component.label')}</InputLabel>
                    <Select
                        value={selectedEcommerce ?? ''}
                        onChange={handleChange}
                        input={
                            <OutlinedInput
                                label={t('selector_component.label')}
                            />
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
                </FormControl>
            )}
        </>
    )
}

export default SelectorComponent
