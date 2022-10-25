import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import LogoLogin from '../assets/images/icons/LogoLogin.svg'
import LandingImage from '../assets/images/icons/LandingImage.svg'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'
import _ from 'lodash'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'

// Form validation
const schema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter an email'),
    password: yup.string().required('Please enter your password.')
})

function LoginPage() {
    // React Hook Forms set up
    const { handleSubmit, control, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const { errors, dirtyFields, isValid } = formState

    const onSubmit = () => {
        const count = 1
    }

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
                    </UtilsContainer>
                    <h4 className="my-6">Sign in</h4>
                    <form
                        className="flex w-full flex-col justify-center"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    error={!!errors.email}
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
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText=""
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <Button
                            variant="contained"
                            aria-label="Sign in"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                            type="submit"
                            size="medium"
                            sx={{ borderRadius: 73 }}
                        >
                            Sign in
                        </Button>
                    </form>
                </FormContainer>
            </LeftBox>

            <RightBox>
                <img src={LandingImage} alt="BackgroundImage" />
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

const FormContainer = styled.form`
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
