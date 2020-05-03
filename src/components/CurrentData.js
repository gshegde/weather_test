import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './CurrentData.module.css';
const CurrentData = ({ currentCity, currentTemp, description }) => {
    console.log("bsd20" + currentCity)

    return (
        <Grid className={styles.currentCard} style={{
            width: '400px',
            marginLeft: '35%',
            backgroundColor: 'transparent',
            marginTop: "50px",
            boxShadow: '2px'
        }} item component={Card} xs={12} md={6} className={styles.card} >
            <CardContent>
                <Typography style={{
                    backgroundColor: "linear-gradient(to right top, #887586, #91757a, #917870, #897e6c, #7d8371)",
                    fontSize: 33,
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    color: "#2882F8",
                    letterSpacing: "0.0075em",
                    verticalAlign: "middle",
                    alignItems: "center",
                    textAlign: "center"
                }} color="textSecondary" > Its {description} in {currentCity} </Typography>


                <Typography style={{ color: "#3d3110", marginTop: "0px" }} variant="h6" align="center" color="textSecondary">temp {currentTemp} C </Typography>
            </CardContent>

        </Grid>
    )
}

export default CurrentData;