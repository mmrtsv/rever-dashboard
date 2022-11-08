import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import LogoLogin from '../assets/images/icons/LogoLogin.svg'
import LandingImage from '../assets/images/icons/LandingImage.svg'
import TextField from '@mui/material/TextField'
// import FormControl from '@mui/material/FormControl'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'
import * as yup from 'yup'
import _ from 'lodash'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { login } from '../redux/api/authApi'
import { LoginInput } from '@itsrever/dashboard-api'
import { useNavigate } from 'react-router-dom'
import { resetAuthApiCalls } from '../redux/api/authApi'
import { useEffect } from 'react'
import { setUserData } from '../redux/features/userData/userDataSlice'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

// Form validation
const schema = yup.object().shape({
    username: yup
        .string()
        .email('You must enter a valid username')
        .required('You must enter an username'),
    password: yup.string().required('Please enter your password.')
})

const defaultValues: LoginInput = {
    username: '',
    password: ''
    // remember: false
}

function LoginPage() {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    // React Hook Forms set up
    const { handleSubmit, control, formState } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    })
    const { errors, dirtyFields, isValid } = formState

    function onSubmit({ username, password }: LoginInput) {
        dispatch(login({ username, password } as LoginInput))
    }
    const navigate = useNavigate()
    const authApi = useAppSelector((store) => store.authApi)

    useEffect(() => {
        if (authApi.login.loading === 'succeeded') {
            if (authApi.login.response.user) {
                dispatch(setUserData(authApi.login.response.user))
                localStorage.setItem(
                    'user',
                    JSON.stringify(authApi.login.response.user)
                )
            }
            dispatch(resetAuthApiCalls())
            navigate('/')
        } else if (authApi.login.loading === 'failed') {
            dispatch(resetAuthApiCalls())
            alert('Login failed')
        }
    }, [authApi.login.response, authApi.login.loading])

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
                    <form
                        className="flex w-full flex-col justify-center"
                        onSubmit={handleSubmit(onSubmit)}
                        data-testid="login-form"
                    >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('login_page.username')}
                                    autoFocus
                                    data-testid="username-input"
                                    type="email"
                                    error={!!errors.username}
                                    helperText=""
                                    required
                                    fullWidth
                                />
                            )}
                        />
                        <div className="my-6">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={t('login_page.password')}
                                        type="password"
                                        data-testid="password-input"
                                        error={!!errors.password}
                                        helperText=""
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        {/* <div className="mb-2 flex flex-col items-center justify-center">
                            <Controller
                                name="remember"
                                control={control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormControlLabel
                                            label="Remember me"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                        </div> */}

                        <Button
                            variant="contained"
                            aria-label="Sign in"
                            data-testid="sign-in-button"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="medium"
                            sx={{ borderRadius: 73 }}
                        >
                            <a data-testid="sign-in-text">
                                {t('login_page.button_submit')}
                            </a>
                        </Button>
                    </form>
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

const RightBox = styled(Box)`
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
