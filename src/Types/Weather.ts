export interface IWeatherItem {
    dt_txt: string;
    weather: [{
        main: string
    }]
    main: {
        temp: string
    }
  }
  
export interface IWeatherResponse {
    date: string
    main: string
    temp: string
  }