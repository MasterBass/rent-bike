import React from 'react';

const SelectInputAndButton = ({name, label, onChange, defaultOption, value, error, options, btnOnClick, btnText}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="input-group">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control">
                    <option value="">{defaultOption}</option>
                    {options.map((option) => {
                        return <option key={option.id}
                                       value={option.id}>{option.name}</option>;
                    })
                    }
                </select>
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={btnOnClick}>{btnText}</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default SelectInputAndButton;