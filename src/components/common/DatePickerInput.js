import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerInput = ({name, label, onChange, value, error, minDate}) => {
    let wrapperClass='form-group';
    if(error && error.length > 0) {
        wrapperClass +=  ' has-error';
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <DatePicker
                    name={name}
                    className="form-control"
                    dateFormat="DD-MM-YYYY"
                    minDate={minDate}
                    selected={value}
                    onChange={onChange}/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default DatePickerInput;