import { initialApiState, ApiCallBase } from './apiConfiguration'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from './apiConfiguration'
import {
    LocationsApi,
    ProcessessapiDbCountryISO
} from '@itsrever/dashboard-api'

const locationsApi = new LocationsApi(undefined, undefined, axiosInstance)

interface CountriesCall extends ApiCallBase {
    response: Array<ProcessessapiDbCountryISO>
}

interface State {
    countries: CountriesCall
}

const initialState: State = {
    countries: initialApiState
}

export const getCountries = createAsyncThunk('/getCountries', async () => {
    let countriesResponse
    try {
        countriesResponse = JSON.parse(
            localStorage.getItem('dashboardCountries') ?? ''
        )
    } catch {
        countriesResponse = await locationsApi.findCountries()
    }
    return countriesResponse
})

const locationsApiSlice = createSlice({
    name: 'locationsApi',
    initialState,
    reducers: {
        resetLocationsApiCalls: (state) => {
            state.countries = {
                ...initialApiState,
                response: state.countries.response
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCountries.pending, (state) => {
            state.countries.loading = 'pending'
        })
        builder.addCase(getCountries.fulfilled, (state, action) => {
            state.countries.loading = 'succeeded'
            state.countries.response = action.payload.data
            localStorage.setItem(
                'dashboardCountries',
                JSON.stringify(action.payload)
            )
        })
        builder.addCase(getCountries.rejected, (state, action) => {
            state.countries.loading = 'failed'
            state.countries.error = action.error
        })
    }
})

export const { resetLocationsApiCalls } = locationsApiSlice.actions
export default locationsApiSlice.reducer
