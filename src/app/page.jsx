"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getData, getLiveData, setInput } from "@/redux/features/weatherSlice";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BsCloudFog } from "react-icons/bs";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { RiScales2Line } from "react-icons/ri";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import image from "../assets/img/404.png"
import favcon from "../assets/img/favcon.png"
export default function Home() {
  let datas = useAppSelector((state) => state.weatherReducer.data);
  console.log(datas);
  let data_live = useAppSelector((state) => state.weatherReducer.live_data);
  let inp = useAppSelector((state) => state.weatherReducer.userInput);

  const [formData, setFormData] = useState('');
  const [close, setClose] = useState('false');
  const dispatch = useAppDispatch();

  console.log(data_live);

  const handleInputChange = async (e) => {
    setClose('false');
    const inputValue = e.target.value;
    setFormData(inputValue);

    dispatch(setInput(inputValue));
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

  const handleClick = async (e) => {
    if (formData) {
      dispatch(getData(formData));
      setClose('true');

    }
  };

  const removeIt = () => {
    setClose('true');
  };

  useEffect(() => {
    if (!formData) {
      dispatch(getData("Ahmedabad"));
      setClose('true');

    }
  }, []);

  return (
    <div className="overflow-hidden main min-h-screen px-4 md:px-8 lg:px-16 py-4 sm:py-8 md:py-12 relative">
      <title>Weather App</title>
      <link  rel="icon" type="image/x-icon" href={favcon.src}/>
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
              formData ? data_live.length > 1 ? data_live?.map((item) => (
                <div key={item.id} className={`bg-white p-4 w-auto hover:bg-[#eee] hover:cursor-pointer`} onClick={() => { dispatch(getData(item.name)); removeIt(); }}>
                  {item.name},&nbsp;{item.country}
                </div>
              )) : "" : ""
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
            <p className="text-[24px] text-center py-4">Sorry !!! We can not find <i className="text-[30px] font-bold">{formData}</i></p>
            </div>
        </>
          : <>

            <div className="mt-4 sm:mt-8 md:mt-16 py-4 px-4 sm:px-8 md:px-16 flex flex-col sm:flex-row justify-between w-full text-white rounded-xl bg-[rgba(0,0,0,0.6)]">
              <div className="w-full sm:w-[55%]">
                <h1 className="flex items-center text-[30px]"><CiLocationOn /><a className="pl-4 font-bold">{datas?.name}</a></h1><br></br>
                {datas.main ? <h1 className="celc text-[70px] font-bold">{Data}&deg;C</h1> : null}<br></br>
                <h1 className="flex items-center text-[30px]"><BsCloudFog /><a className="pl-4 font-bold">{real}</a></h1>
              </div>
              <div className="pt-4 w-full sm:w-[45%] grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
                <div className="grid grid-cols-2 lg:grid-cols-1">
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] font-medium text-[20px]"><BsSunrise /><a className="pl-4">{myArrayrise[4]} IST</a></h1>
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] font-medium text-[20px]"><BsSunset /><a className="pl-4">{myArraySet[4]} IST</a></h1>
                </div>
                <div className="grid grid-cols-2 pt-3 lg:pt-0 md:pt-0 lg:grid-cols-1">
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] font-medium text-[20px]"><RiScales2Line /><a className="pl-4">{datas?.main?.pressure} hPa</a></h1>
                  <h1 className="w-full lg:font-bold flex items-center lg:text-[30px] font-medium text-[20px]"><MdOutlineRemoveRedEye /><a className="pl-4">{datas.visibility / 1000} Miles</a></h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 mt-4 sm:mt-8 bg-[rgba(0,0,0,0.6)] p-4 sm:p-6 lg:p-6 text-white rounded-xl ">
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{Data1}&deg;C</h1><i className="text-xl font-thin">Feels Like</i></div>
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.main?.humidity} %</h1><i className="text-xl font-thin">Humidity</i></div>
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.wind?.speed} MPH</h1><i className="text-xl font-thin">Wind Speed</i></div>
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{min}&deg;C</h1><i className="text-xl font-thin">Minimum Today</i></div>
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{max}&deg;C</h1><i className="text-xl font-thin">Maximum Today</i></div>
              <div className="pl-4 pt-2 lg:pt-0 sm:pt-2 md:pt-0 sm:pl-8"><h1 className="lg:font-bold font-medium text-[27px]">{datas?.sys?.country}</h1><i className="text-xl font-thin">Country</i></div>
            </div>
          </>
      }
    </div>
  );
}
