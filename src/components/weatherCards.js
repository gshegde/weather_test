import React, { useEffect, useState } from 'react';
import { Card, Box, Typography, Grid } from '@material-ui/core';
import styles from './weaterCards.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faCloudRain, faCloudMeatball, faCloudSun, faCloud, faCloudMoon, faCloudMoonRain, faSkyatlas, faMixcloud, faCloudSmith } from "@fortawesome/free-solid-svg-icons";
const weatherCards = ({ data }) => {

    if (!data) {
        return 'Loading'

    }
    const cards =
        data.map((day, i) => {
            return <Box item xs={12} sm={6} md={4} boxShadow={8}
                m={2}
                p={4}
                style={{ backgroundColor: "#D6C99A", marginLeft: '30px', fontWeight: "bold", marginRight: '30px', marginTop: "50px", width: "120px", height: "200px" }}
            > <Typography variant="caption" nowrap="false" align="top" color="secondary" >{day.dt_txt}</Typography>
                <Typography
                    style={{ color: "#3d3110", marginTop: "20px", fontWeight: "bold" }}
                    variant="h4" align="center" color="textSecondary" >{(day.main.temp - 273.15).toFixed(2)} C</Typography>
                <Typography
                    style={{ color: "#3d3110" }}
                    variant="caption" align="center" color="textSecondary" >{`Realfeel@ ${(day.main.feels_like - 273.15).toFixed(2)} C`} </Typography>
                <Typography
                    style={{ fontSize: "10px", marginTop: "10px", color: "#3d3110" }}
                    variant="button" align="center" color="Primary" gutterBottom="true">{day.weather[0].description}</Typography>
                {(day.weather[0].description === "few clouds") && <FontAwesomeIcon icon={faCloud} size="3x" color="#195e83" />}
                {(day.weather[0].description === "clear sky") && <FontAwesomeIcon icon={faCloudSun} size="3x" color="#195e83" />}
                {(day.weather[0].description === "scattered clouds") && <FontAwesomeIcon icon={faCloudMoon} size="3x" color="#195e83" />}
                {(day.weather[0].description === "broken clouds") && <FontAwesomeIcon icon={faCloudMeatball} size="3x" color="yellow" />}
                {(day.weather[0].description === "overcast clouds") && <FontAwesomeIcon icon={faCloudRain} size="3x" color="#195e83" />}
                {(day.weather[0].description === "light rain") && <FontAwesomeIcon icon={faCloudSunRain} size="3x" color="#1c1004" />}

            </Box>

        })
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" style={{
            width: '100%',

        }}>
            {cards}
        </Box>

    )
}

export default weatherCards;

