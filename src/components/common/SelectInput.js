import React from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    {defaultOption && <option value="">{defaultOption}</option>}
                    {options.map((option) => {
                        return <option key={option.id}
                                       value={option.id}>{option.name}</option>;
                    })
                    }
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

export default SelectInput;
