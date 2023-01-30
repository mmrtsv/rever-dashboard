import React from 'react'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import LogoLogin from '../assets/images/icons/LogoLogin.svg'
import LandingImage from '../assets/images/icons/LandingImage.svg'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'
import _ from 'lodash'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useAuth0 } from '@auth0/auth0-react'
// Form validation
const schema = yup.object().shape({
    username: yup
        .string()
        .email('You must enter a valid username')
        .required('You must enter an username'),
    password: yup.string().required('Please enter your password.')
})

function LoginPage() {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const navigate = useNavigate()

    const {
        getAccessTokenWithPopup,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently
    } = useAuth0()

    return (
        <MainDiv>
            <LeftBox>
                <FormContainer>
                    <UtilsContainer>
                        <img
                            className="w-12"
                            src={LogoLogin}
                            alt="Rever Logo"
                        />
                        <LanguageSwitcher />
                    </UtilsContainer>
                    <h4 data-testid="sign-in" className="my-6">
                        {t('login_page.sign_in')}
                    </h4>
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 73 }}
                        size="medium"
                        onClick={() => loginWithRedirect()}
                    >
                        <a data-testid="sign-in-text">
                            {t('login_page.button_submit')}
                        </a>
                    </Button>
                </FormContainer>
            </LeftBox>

            <RightBox>
                <img
                    src={LandingImage}
                    alt="BackgroundImage"
                    data-testid="landing-image"
                />
            </RightBox>
        </MainDiv>
    )
}

export default LoginPage

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //flex: 1 1 0%;
    //min-width: 0px;
    @media (min-width: 600px) {
        justify-content: center;
        background-color: aliceblue;
    }
    @media (min-width: 900px) {
        flex-direction: row;
        background-color: transparent;
        align-items: flex-start;
        justify-content: flex-start;
    }
`

const LeftBox = styled(Paper)`
    height: 100vh;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border-right-width: 1px;
    @media (min-width: 600px) {
        margin-top: 6rem;
        width: auto;
        height: auto;
        padding: 6rem;
        border-radius: 1rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
            0 1px 2px -1px rgb(0 0 0 / 0.1);
    }
    @media (min-width: 900px) {
        height: 100vh;
        margin-top: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 50%;
        //padding: 16rem;
        border-radius: none;
        box-shadow: none;
    }
`

const FormContainer = styled.div`
    height: 100%;
    width: 100%;
    max-width: 32rem;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 600px) {
        margin-right: 0%;
        margin-left: 0%;
        width: 20rem;
    }
`

const UtilsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const RightBox = styled.div`
    position: relative;
    visibility: hidden;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 8rem;
    overflow: hidden;
    @media (min-width: 900px) {
        visibility: visible;
        display: flex;
    }
    @media (min-width: 1200px) {
        visibility: visible;
        padding-top: 11.2rem;
        padding-bottom: 11.2rem;
    }
`
