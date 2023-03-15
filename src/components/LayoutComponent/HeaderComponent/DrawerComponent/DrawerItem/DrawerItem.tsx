import React from 'react'
import { ListItemButton, ListItemIcon } from '@mui/material'
import { useTheme } from '@itsrever/design-system'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ItemProps {
    icon?: React.ReactNode
    text: string
}

const DrawerItem: React.FC<ItemProps> = ({ icon, text }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const theme = useTheme()

    const handleClick = () => {
        if (text === 'returns') {
            navigate('/')
        } else navigate(`/${text}`)
    }

    return (
        <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
            {icon && (
                <ListItemIcon>
                    <div
                        style={{
                            color: theme.colors.common.white
                        }}
                    >
                        {icon}
                    </div>
                </ListItemIcon>
            )}
            <h6 className="text-lg">{t(`drawer_pages.${text}`)}</h6>
        </ListItemButton>
    )
}

export default DrawerItem
