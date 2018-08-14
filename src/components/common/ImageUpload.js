import React from 'react';

const ImageUpload = ({imageUploadId, name, label, onChange, percentage, upload, error, uploading, btnText}) => {
    return (
        <div className='form-group'>
            <label>{label}</label>
            <div>
                <progress value={percentage} max="100"/>
            </div>

            <div className="input-group">
                <input
                    id={imageUploadId}
                    type="file"
                    name={name}
                    className="form-control"
                    disabled={uploading}
                    onChange={onChange}/>
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default"
                            disabled={uploading}
                            onClick={upload}>{uploading ? 'Uploading....' : btnText}</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default ImageUpload;