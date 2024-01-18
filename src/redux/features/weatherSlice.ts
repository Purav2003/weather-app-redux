import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
    data: {}; // Adjust the type based on the actual structure of your data
    isLoading: boolean;
    live_data: [];
    userInput: "", // New property to store user input
}


export const getData = createAsyncThunk('weather/getData', async (city: string) => {
    try {

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4ae24496549355b15e4a719111440e4&units=imperial`;
        const response = await fetch(api);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});
export const getLiveData = createAsyncThunk('weather/getLiveData', async (city: string) => {
    try {
        const api = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=d4ae24496549355b15e4a719111440e4&units=imperial`;
        const response = await fetch(api);
        console.log(api)
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
});

const initialState: WeatherState = {
    data: {},
    isLoading: false,
    live_data: [],
    userInput: "", // New property to store user input

};

export const weather = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.userInput = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLiveData.pending, (state) => {
                state.isLoading = true;
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
            });
    },
});


export const { setInput } = weather.actions;

export default weather.reducer;
