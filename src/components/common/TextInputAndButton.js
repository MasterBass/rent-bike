import React from 'react';

const TextInputAndButton = ({name, label, onChange, placeholder, value, error, btnOnClick, btnText, saving}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="input-group">
                <input
                    type="text"
                    name={name}
                    disabled={saving}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}/>
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default"
                            disabled={saving}
                            onClick={btnOnClick}>{saving ? 'Saving....' : btnText}</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default TextInputAndButton;