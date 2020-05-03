import React from 'react';
import styles from './App.module.css';
import { TextField, Paper, List, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { fetchWeather } from './api';
import { fetchCurrent } from './api';
import { fetchCountries } from './api';
import CurrentData from './components/CurrentData.js';
import WeatherCards from './components/weatherCards.js';
import Pagination from './components/Pagination.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
library.add(faStroopwafel);
class App extends React.Component {
  state = {
    data: [],
    country: '',
    currentPage: 1,
    postsPerPage: 6,
    dataCurrent: [],
    countries: [],
    suggestions: [],
    selectedcountry: "",
    issuggestion: false,
    searchText: "",
    currentTemp: null,
    description: "",
    currentCity: ""
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      // const regex = new RegExp(`^${value}`, 'i');
      // console.log(this.state.countries)
      suggestions = this.state.countries.filter(function (val) {
        if (val.name.toLowerCase().includes(value)) return true;
      });
      // console.log("suggest1" + suggestions);
    }
    this.setState({ suggestions: suggestions, issuggestion: true, searchText: value })
  }

  async suggestionSelected(value) {
    console.log("value" + typeof (value))
    if (value !== (null && "")) {
      const fetcheddata = await fetchWeather(value);
      const currentTemp = (fetcheddata[0].main.temp - 273.15).toFixed(2);
      const description = (fetcheddata[0].weather[0].description);
      const currentCity = value;
      this.setState({ data: fetcheddata, suggestions: [], searchText: value, issuggestion: false, currentTemp: currentTemp, description: description, currentCity: currentCity })

    }
  }


  async onClickCountry() {

    const fetcheddata = await fetchWeather("Bengaluru");
    this.setState({ data: fetcheddata })

  }

  async componentDidMount() {
    // const currentData = await fetchCurrent();
    // this.setState({ dataCurrent: currentData })
    const fetcheddata = await fetchWeather("Bengaluru");
    console.log("bsd" + fetcheddata)
    console.log("GSH7" + fetcheddata);
    console.log("GSH19" + (JSON.stringify(fetcheddata)));
    console.log("GSH19" + (fetcheddata[0].main.temp - 273.15).toFixed(2));
    console.log("GSH19" + (fetcheddata[0].weather[0].description));
    const currentTemp = (fetcheddata[0].main.temp - 273.15).toFixed(2);
    const description = (fetcheddata[0].weather[0].description);
    const currentCity = "Bengaluru";
    this.setState({ data: fetcheddata, currentTemp: currentTemp, description: description, currentCity: currentCity })
    // console.log("karwar" + fetcheddata.map((a) => {
    //   return a.weather[0].description;
    // }))
    console.log(this.state.dataCurrent)
    const countriesData = await fetchCountries();

    this.setState({ countries: countriesData })

  }
  render() {
    const { data, countries, searchText, suggestions, issuggestion, description, currentCity, currentTemp } = this.state;
    console.log("bsd" + currentTemp);
    console.log("bsd12" + description);
    // console.log("suggest" + suggestions);
    // console.log(typeof (countries));
    //Get current data
    const indexofLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexofFirstPost = indexofLastPost - this.state.postsPerPage;
    const currentDatas = data.slice(indexofFirstPost, indexofLastPost);
    //paginate
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });

    return (
      <div className={styles.background}>
        <TextField autoFocus="true" value={searchText} onChange={(e) => this.onChangeHandler(e)} style={{
          width: "300px",
          marginLeft: "600px",
          marginTop: "20px"
        }} margin="dense" className={styles.txtBox} id="outlined-bare" placeholder="Search your City" variant="outlined" InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
              {/* onClick={this.suggestionSelected(searchText)} */}

            </InputAdornment>
          )
        }} />

        {issuggestion &&
          <Paper style={{
            maxHeight: 200, overflow: 'auto', maxWidth: "300px", width: "300px",
            marginLeft: "600px"
          }}>
            <List>
              {suggestions.map((country) => <li onClick={() => this.suggestionSelected(country.name)}>{country.name}</li>)}
            </List>
          </Paper>}
        <CurrentData currentCity={currentCity} currentTemp={currentTemp} description={description} />
        <WeatherCards data={currentDatas} />
        <Typography style={{
          backgroundColor: "linear-gradient(to right top, #887586, #91757a, #917870, #897e6c, #7d8371)",
          fontSize: 18,
          fontFamily: "Montserrat",
          fontWeight: "bold",
          color: "#195e83",
          letterSpacing: "0.0075em",
          verticalAlign: "middle",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "30px",
          marginTop: "0px"
        }} color="textSecondary" > ForeCasts for {currentCity} </Typography>
        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={data.length} paginate={paginate} />

      </div>
    );
  }
}
export default App;
