"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getData, getLiveData, getForcast } from "@/redux/features/weatherSlice";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { RiScales2Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import image from "../assets/img/404.png"
import favcon from "../assets/img/favcon.png"
import loader from "../assets/img/loader.gif"
import { MdTimeline } from "react-icons/md";

import { useCallback } from "react";
export default function Home() {
  let datas = useAppSelector((state) => state.weatherReducer.data);
  let data_live = useAppSelector((state) => state.weatherReducer.live_data);
  let isLoading = useAppSelector((state) => state.weatherReducer.isLoading);
  const forecast_data = useAppSelector((state) => state.weatherReducer.forecast_data);
  let data_forcast = forecast_data?.list
  data_forcast = data_forcast?.filter((element, index) => index % 4 === 0 || index === 0);
  data_forcast = data_forcast?.filter((element, index) => index % 2 === 0 || index === 0);
  data_forcast = data_forcast?.filter((element, index) => index !== 0);

  console.log(data_forcast)

  let id_city = datas?.id
  console.log(id_city);
  const [formData, setFormData] = useState('');
  const [close, setClose] = useState('false');
  const dispatch = useAppDispatch();
  console.log(forecast_data)


  const handleInputChange = async (e) => {
    setClose('false');
    const inputValue = e.target.value;
    setFormData(inputValue);
    dispatch(getLiveData(inputValue));

  };

  let a, a1, a2, Data, Data1, min, max;
  if (datas.main) {
    a = parseInt(datas.main.temp);
    Data = (a - 32) * 5 / 9;
    Data = Math.floor(Data);
    a1 = parseInt(datas.main.feels_like);
    Data1 = (a1 - 32) * 5 / 9;
    Data1 = Math.floor(Data1);
    a2 = parseInt(datas.main.temp_min);
    min = (a2 - 32) * 5 / 9;
    min = Math.floor(min);
    a1 = parseInt(datas.main.temp_max);
    max = (a1 - 32) * 5 / 9;
    max = Math.floor(max);
  }

  let real = "";
  if (datas.weather) {
    datas.weather.map((data) => {
      let { main } = data;
      real = main;
      return { main };
    });
  }

  let sunrise = "";
  let sunset = "";
  let oaa = "";
  if (datas?.sys) {
    oaa = datas?.sys?.sunrise;
    sunrise = new Date(oaa * 1000);
    oaa = datas?.sys?.sunset;
    sunset = new Date(oaa * 1000);
  }
  const rise = sunrise.toString();
  const set = sunset.toString();
  const myArrayrise = rise.split(" ");
  const myArraySet = set.split(" ");

  const handleClick = useCallback(async () => {
    if (formData) {
      dispatch(getData(formData));
      setClose('true');
    }
  }, [formData, dispatch]);
  const removeIt = () => {
    setClose('true');
  };

  const hello = useCallback(() => {
    if (datas?.id) {
      dispatch(getForcast(id_city));
    }
  }, [datas, dispatch]);

  const getDataCallback = useCallback((city) => {
    dispatch(getData(city));
    setClose('true');
  }, [dispatch]);

  useEffect(() => {
    if (!formData) {
      getDataCallback("Ahmedabad");
    }
    hello();
  }, [id_city]);



  return (
    <div className="overflow-hidden main min-h-screen px-4 md:px-8 lg:px-16 py-4 sm:py-8 md:py-12 relative">
      <title>Weather App</title>
      <link rel="icon" type="image/x-icon" href={favcon.src} />
      <div className="blur-background"></div>
      <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet"></link>
      <nav className="flex flex-col md:flex-row justify-between items-center md:items-stretch">
        <h1 className="main-heading font-bold text-[35px] mb-4 md:mb-0">Accurate Weather</h1>
        <div className="mb-4 md:mb-0">
          <div className="relative items-center">
            <input type="text"
              onChange={handleInputChange}
              className="rounded-full py-2 search-bar w-full md:w-[21vw]" placeholder="Enter City Name" />
            <button type="button" className="fixed absolute inset-y-0 right-0 px-4 text-white rounded-full" onClick={handleClick}>
              <CiSearch />
            </button>
          </div>
          <div className={`lg:max-w-[20%] ${close === 'true' ? "hidden" : ""} absolute`}>
            {
              formData ? data_live.length > 1 ? <>
                <div className={`rounded-md bg-white w-auto`}>

                  {data_live?.map((item) => (
                    <h1 onClick={() => { dispatch(getData(item.name)); removeIt(); }} key={item.name} className="flex items-center p-4 hover:bg-gray-300 rounded-md hover:cursor-pointer"><CiLocationOn /> <span className="pl-2">{item.name}, <b className="text-gray-800">{item.country}</b></span></h1>
                  ))}
                </div>

              </> : "" : ""
            }
          </div>
        </div>
      </nav>

      {
        datas.message === "city not found" ? <>
          <div className="bg-[rgba(255,255,255,0.5)] m-12 rounded-md">
            <div className="justify-center grid">
              <img src={image.src} /><br></br>
            </div>
            <p className="text-[24px] font-bold main-heading text-center py-4">No city found ...</p>
          </div>
        </>
          : <>{
            isLoading ? <>
              <div className="flex items-center justify-center h-[70vh]">
                <img src={loader.src} className="w-[6%]" alt="Loader" />
              </div>

            </> : <><div className="mt-4 sm:mt-8 md:mt-16 py-6 px-8 sm:px-8 md:px-16 flex flex-col sm:flex-row justify-between w-full text-white rounded-xl bg-[rgba(0,0,0,0.6)]">
              <div className="w-full sm:w-[55%]">
                <h1 className="flex items-center text-[30px]"><CiLocationOn /><a className="pl-4 font-bold">{datas?.name}</a></h1><br></br>

                {datas.main ? 
                  
                <h1 className="celc text-[70px] text-center lg:text-left md:text-left font-bold">{Data}&deg;C</h1> : null}<br></br>
                <div className="mb-2">
                  {datas?.weather?.map((weatherItem, index) => (
                    <div key={index} className="flex items-center">
                      <img src={`https://openweathermap.org/img/wn/${weatherItem?.icon}.png`} alt="weather icon" className={`w-12 h-12 text-[white] ${weatherItem?.main !== "Clear"?"bg-[rgba(255,255,255,0.6)] rounded-full mr-4":""}`} />
                      <span className="text-[30px] capitalize font-bold mr-2">{weatherItem?.main}</span>
                    </div>
                  ))}
                </div>              </div>
              <div className="pt-4 w-full sm:w-[45%] grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
                <div className="grid grid-cols-2 lg:grid-cols-1">
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] md:text-[22px] font-medium text-[18px]"><BsSunrise /><a className="pl-4">{myArrayrise[4]} IST</a></h1>
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] md:text-[22px] font-medium text-[18px]"><BsSunset /><a className="pl-4">{myArraySet[4]} IST</a></h1>
                </div>
                <div className="grid grid-cols-2 pt-3 lg:pt-0 md:pt-0 lg:grid-cols-1">
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] md:text-[22px] font-medium text-[18px]"><RiScales2Line /><a className="pl-4">{datas?.main?.pressure} hPa</a></h1>
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] md:text-[22px] font-medium text-[18px]"><MdOutlineRemoveRedEye /><a className="pl-4">{datas.visibility / 1000} Miles</a></h1>
                </div>
              </div>
            </div>
              <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-6 mt-4 sm:mt-8 bg-[rgba(0,0,0,0.6)] p-4 sm:p-6 lg:p-6 text-white rounded-xl ">
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{Data1}&deg;C</h1><i className="text-xl font-thin">Feels Like</i></div>
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.main?.humidity} %</h1><i className="text-xl font-thin">Humidity</i></div>
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.wind?.speed} MPH</h1><i className="text-xl font-thin">Wind Speed</i></div>
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{min}&deg;C</h1><i className="text-xl font-thin">Minimum Today</i></div>
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{max}&deg;C</h1><i className="text-xl font-thin">Maximum Today</i></div>
                <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.sys?.country}</h1><i className="text-xl font-thin">Country</i></div>
              </div>
              <div className="mt-4 sm:mt-8 p-6 bg-[rgba(0,0,0,0.6)] text-white rounded-xl">
                <h1 className="pb-4 font-bold text-[30px] flex pl-2 items-center"><MdTimeline />&nbsp; 4 Day Forcast</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {data_forcast?.map((item, index) => {
                    const date = new Date(item.dt_txt);
                    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

                    return (
                      <div key={index} className="bg-gray-900 p-6 rounded-md">
                        <div className="text-lg font-semibold mb-2">
                          {item?.dt_txt?.split(' ')[0]?.split('-').reverse().slice(0, 2).join('-')} , {day}
                        </div>
                        <div className="text-2xl mb-2">
                          {((item.main?.temp_min - 32) * 5 / 9).toFixed(0)}&deg;C / {((item.main?.temp_max - 32) * 5 / 9).toFixed(0)}&deg;C
                        </div>
                        <div className="mb-2 flex items-center">
                          {item?.weather?.map((weatherItem, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-lg capitalize mr-1">{weatherItem?.main}</span>
                              <img src={`https://openweathermap.org/img/wn/${weatherItem?.icon}.png`} alt="weather icon" className="w-8 h-8" />
                            </div>
                          ))}
                        </div>
                        <div className="text-lg">
                          Wind: {item?.wind?.speed} MPH
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </>}
          </>
      }

    </div>
  );
}
