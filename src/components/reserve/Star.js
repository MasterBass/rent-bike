import React from 'react';

const Star = ({reserve, currentRate, rateOnChange, level}) => {

    return (

        <span>
            {currentRate >= level ? (
                <span className="rate glyphicon glyphicon-star"
                      onClick={() => rateOnChange(reserve.id, level)}/>
            ) : (
                <span className="rate glyphicon glyphicon-star-empty"
                      onClick={() => rateOnChange(reserve.id, level)}/>
            )}
        </span>
    )
};

export default Star;
