import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import LogoLogin from '../assets/images/icons/LogoLogin.svg'
import TextField from '@mui/material/TextField'
import * as yup from 'yup'

// Form validation
const schema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid email')
        .required('You must enter an email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.')
})

function LoginPage() {
    // React Hook Forms set up
    const { register, handleSubmit, control, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    })
    const { errors } = formState

    let count = 1
    const onSubmit = () => {
        count += 1
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
                    <h4 className="mt-6">Sign in</h4>
                    <form
                        className="flex flex-col justify-center w-full mt-8"
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
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </form>
                </FormContainer>
            </LeftBox>
            <div>{count}</div>
        </MainDiv>
    )
}

export default LoginPage

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;
    min-width: '0px';
    @media (min-width: '600px') {
        flex-direction: row;
        justify-content: center;
    }
    @media (min-width: '900px') {
        align-items: flex-start;
        justify-content: flex-start;
    } ;
`

const LeftBox = styled(Paper)`
    height: 100%;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
    padding-right: 4rem;
    border-right-width: '1px';
    @media (min-width: '600px') {
        width: auto;
        height: auto;
        padding: 12rem;
        border-radius: 1rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
            0 1px 2px -1px rgb(0 0 0 / 0.1);
    }
    @media (min-width: '900px') {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
        width: 50%;
        padding: 16rem;
        border-radius: none;
        box-shadow: none;
    }
`

const FormContainer = styled.form`
    width: 100%;
    max-width: 32rem;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: '600px') {
        margin-right: 0%;
        margin-left: 0%;
        width: 32rem;
    }
`

const UtilsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
