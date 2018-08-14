import React from 'react';
import TextInput from '../common/TextInput';
import TextInputAndButton from '../common/TextInputAndButton';
import ImageUpload from '../common/ImageUpload';
import CheckBoxInput from '../common/CheckBoxInput';
import SelectInputAndButton from '../common/SelectInputAndButton';
import MapComponent from "../common/MapComponent";

const BikeForm = ({bike, onSave, onChange, onSearch, img,
                      percentage, upload, uploading, imageUploadId, saving,
                      errors, colors, btnOnClick, location}) => {
    return (
        <form>
            <TextInput
                name="model"
                label="Model"
                value={bike.model}
                onChange={onChange}
                error={errors.model}/>

            <SelectInputAndButton
                name="color"
                label="Color"
                value={bike.colorId}
                btnText={<span className="glyphicon glyphicon-pencil"/>}
                btnOnClick={btnOnClick}
                defaultOption="Please select color"
                onChange={onChange}
                options={colors}
                error={errors.colorId}/>

            <TextInput
                name="weight"
                label="Weight, kg"
                value={bike.weight}
                onChange={onChange}
                error={errors.weight}/>

            <ImageUpload
                imageUploadId={imageUploadId}
                name="image"
                label="Image"
                onChange={onChange}
                percentage={percentage}
                upload={upload}
                uploading={uploading}
                error={errors.image}
                btnText={<span className="glyphicon glyphicon-upload"/>}/>

            <img src={bike.img} className="bike-img" alt="bike"/>


            <TextInputAndButton
                name="location"
                label="Location"
                value={bike.location.address}
                onChange={onChange}
                btnOnClick={onSearch}
                btnText={<span className="glyphicon glyphicon-search"/>}
                error={errors.location}/>

            <MapComponent
                zoom={8}
                centerLocation={location}
                markers={[{lat: location.lat, lng: location.lng}]}
            />

            <CheckBoxInput
                name="isAvailable"
                label="Is Available"
                value={bike.isAvailable}
                onChange={onChange}/>

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving....' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

export default BikeForm;
