import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DatePickerInput from '../common/DatePickerInput';
import 'react-datepicker/dist/react-datepicker.css';

const FiltersForm = ({filter, errors, applying, clearFilter,
                         onApply, onChange, colors, rates,
                         startDateChange, endDateChange}) => {
    return (
        <form>
            <h2>Make your choice</h2>

            <DatePickerInput
                name="startDate"
                label="Start At"
                onChange={startDateChange}
                error={errors.startDate}
                value={filter.startDate}
                minDate={filter.minStartDate}

            />
            <DatePickerInput
                name="endDate"
                label="End At"
                onChange={endDateChange}
                error={errors.endDate}
                value={filter.endDate}
                minDate={filter.minEndDate}
            />

            <SelectInput
                name="color"
                label="Color"
                value={filter.color}
                onChange={onChange}
                defaultOption="No filter by color"
                options={colors}
                error={errors.color}/>

            <TextInput
                name="model"
                label="Model"
                value={filter.model}
                onChange={onChange}
                error={errors.model}/>

            <TextInput
                name="weight"
                label="Maximal Weight, kg"
                value={filter.weight}
                onChange={onChange}
                error={errors.weight}/>

            <TextInput
                name="location"
                label="Location"
                value={filter.location}
                onChange={onChange}
                error={errors.location}/>

            <SelectInput
                name="rate"
                label="Minimal Rate"
                value={filter.rate}
                onChange={onChange}
                defaultOption="No filter by rate"
                options={rates}
                error={errors.rate}/>

            <input
                type="submit"
                disabled={applying}
                value={applying ? 'Applying....' : 'Apply Filters'}
                className="btn btn-primary"
                onClick={onApply}/>&nbsp;&nbsp;

            <input
                type="submit"
                value="Clear Filters"
                className="btn btn-default"
                onClick={clearFilter}/>
        </form>
    );
};

export default FiltersForm;
