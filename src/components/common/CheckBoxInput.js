import React from 'react';

const CheckBoxInput = ({name, label, onChange, value}) => {
    let wrapperClass='form-check';

    return (
        <div className={wrapperClass}>
            <div className="field">
                <input
                    type="checkbox"
                    name={name}
                    className="form-control checkbox"
                    checked={value}
                    onChange={onChange}/>
                <label className="checkbox-label" htmlFor={name}>{label}</label>
            </div>
            <div className="clear"/>
        </div>
    );
};

export default CheckBoxInput;