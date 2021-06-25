import React from 'react'
import {Card , CardContent , Typography} from "@material-ui/core";


function InfoBox({title , cases , total}) {
    return (
        <Card className='infoBox'>
            <div>
            <CardContent>
                <Typography className='infoBox__title' color="textPrimary"><h1>{title}</h1></Typography>
                <Typography className='infoBox__cases'  color="textSecondary"><h3>Today Cases = {cases}</h3></Typography>
                <Typography className='infoBox__total' color="textSecondary"><h3>Total Cases = {total}</h3></Typography>
            </CardContent>
            </div>
        </Card>
       
    )
}

export default InfoBox
