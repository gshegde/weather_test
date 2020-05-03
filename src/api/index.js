import axios from 'axios'

//const url = 'http://api.openweathermap.org/data/2.5/forecast?id=1253985&appid=ff5d084541aac5b27ef0f46c449da8ca';
const url = 'http://api.openweathermap.org/data/2.5/forecast?q=Bengaluru&appid=ff5d084541aac5b27ef0f46c449da8ca'

const urlcurrent = 'http://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=ff5d084541aac5b27ef0f46c449da8ca';
export const fetchWeather = async (city) => {
    try {
        //Destructuring the recieved data in clean way...
        const { data: { list } } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ff5d084541aac5b27ef0f46c449da8ca`);
        return list;
    }
    catch (error) {
        console.log(error);
    }

}


export const fetchCurrent = async () => {
    try {
        //Destructuring the recieved data in clean way...
        const { data } = await axios.get(urlcurrent);
        return data;
    }
    catch (error) {
        console.log(error);
    }

}



export const fetchCountries = async () => {
    try {
        //Destructuring the recieved data in clean way...
        const { data } = await axios.get('Countries.json');

        return data;
    }
    catch (error) {
        console.log(error);
    }

}
