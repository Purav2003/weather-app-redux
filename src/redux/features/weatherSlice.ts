import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
    data: {}; 
    isLoading: boolean;
    live_data: [];
    forecast_data:[];
}


export const getData = createAsyncThunk('weather/getData', async (city: string) => {
    try {

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbcf4e9c71e3e65e78c28ff3c4993e05&units=imperial`;
        const response = await fetch(api);
        var data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});
export const getLiveData = createAsyncThunk('weather/getLiveData', async (city: string) => {
    try {
        const api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=fbcf4e9c71e3e65e78c28ff3c4993e05&units=imperial`;
        const response = await fetch(api);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

export const getForcast = createAsyncThunk('weather/getForcast', async (id:string   ) => {
    try {
        const api = `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=fbcf4e9c71e3e65e78c28ff3c4993e05&units=imperial`
        console.log(api);
        
        const response = await fetch(api);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

const initialState: WeatherState = {
    data: {},
    isLoading: true,
    live_data: [],
    forecast_data:[],
};

export const weather = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLiveData.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(getForcast.pending, (state) => {
                state.isLoading = false;
            })
            .addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getLiveData.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.live_data = action.payload;
            })
            .addCase(getLiveData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getForcast.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.forecast_data = action.payload;
            })
            .addCase(getForcast.rejected, (state) => {
                state.isLoading = false;
            });
    },
});


export const { } = weather.actions;

export default weather.reducer;
