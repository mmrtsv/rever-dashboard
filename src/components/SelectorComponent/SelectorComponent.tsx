import React, { useState } from 'react'
import { setSelectedEcommerce } from '../../redux/features/generalData/generalDataSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from '@itsrever/design-system'
import { Button, MenuItem, Popover, styled as styledMui } from '@mui/material'
import styled from 'styled-components'

const SelectorComponent = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const [menu, setMenu] = useState<HTMLElement | null>(null)

    const ecommerceList = useAppSelector(
        (store) => store.userApi.getMe.response.user?.ecommerces
    )
    const selectedEcommerce = useAppSelector(
        (store) => store.generalData.selectedEcommerce
    )

    const handleChange = (name: string | undefined) => {
        if (name) localStorage.setItem('selectedEcommerce', name)
        else localStorage.removeItem('selectedEcommerce')
        dispatch(setSelectedEcommerce(name))
        setMenu(null)
    }
    return (
        <>
            {ecommerceList && ecommerceList.length > 1 && (
                <>
                    <CustButton
                        onClick={(e) => setMenu(e.currentTarget)}
                        data-testid="Selector"
                    >
                        <div className="flex items-center">
                            <CustH6
                                className="mr-2 truncate"
                                style={{ color: 'black' }}
                            >
                                {selectedEcommerce
                                    ? selectedEcommerce
                                    : t('selector_component.label')}
                            </CustH6>
                            <ChevronDownIcon />
                        </div>
                    </CustButton>
                    <Popover
                        data-testid="Popover"
                        open={Boolean(menu)}
                        onClose={() => setMenu(null)}
                        anchorEl={menu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <div className="flex items-center">
                            <MenuItem
                                className="flex-1"
                                onClick={() => handleChange(undefined)}
                            >
                                <h6>{t('selector_component.all')}</h6>
                            </MenuItem>
                        </div>
                        {ecommerceList.map((name, i) => (
                            <MenuItem
                                key={i}
                                onClick={() => handleChange(name)}
                            >
                                <h6>{name}</h6>
                            </MenuItem>
                        ))}
                    </Popover>
                </>
            )}
        </>
    )
}

export default SelectorComponent

const CustButton = styledMui(Button)`
    @media (max-width: 599px) {
        max-width: 165px;
    }
`

const CustH6 = styled.h6`
    @media (max-width: 599px) {
        max-width: 100px;
    }
`
