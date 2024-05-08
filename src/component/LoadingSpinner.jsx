import { Backdrop } from '@material-ui/core';
import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { makeStyles } from '@material-ui/core/styles';

import { BeatLoader, ScaleLoader } from 'react-spinners';


const useStyles = makeStyles((theme) => ({
    backdrop: {
    
        zIndex:9999,
        color: '#fff',
    
    },
}));


export const LoadingSpinnerComponent = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    const classes = useStyles();

    function backdropClick(evt) {
        evt.preventDefault();
    }

    return (
        <div>
            <Backdrop tabIndex={-1} invisible={false} className={classes.backdrop} 
                        open={promiseInProgress} onClick={backdropClick} onKeyDown={backdropClick}>

             <ScaleLoader height={50} width={8} radius={4} color="orange" /> 
             </Backdrop>

      
        </div>
    )
};