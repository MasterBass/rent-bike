import React from 'react';
import DatePickerInput from '../common/DatePickerInput';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilterForm = ({startDate, endDate, errors, loading, minDate,
                            onLoad, startDateChange, endDateChange}) => {
    return (
        <form>
            <h2>Make your choice</h2>
            <DatePickerInput
                name="startDate"
                label="Start At"
                onChange={startDateChange}
                error={errors.startDate}
                value={startDate}
                minDate={minDate}

            />
            <DatePickerInput
                name="endDate"
                label="End At"
                onChange={endDateChange}
                error={errors.endDate}
                value={endDate}
                minDate={minDate}
            />
            <input
                type="submit"
                disabled={loading}
                value={loading ? 'Loading....' : 'Load Bikes'}
                className="btn btn-primary"
                onClick={onLoad}/>
        </form>

    );
};

export default DateFilterForm;
