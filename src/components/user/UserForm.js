import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const UserForm = ({user, roles, statuses, onSave, onChange, saving}) => {
    return (
        <form>
            <TextInput
                name="email"
                label="User email"
                value={user.email}
                onChange={onChange}
                readOnly={true}
            />

            <SelectInput
                name="role"
                label="Role"
                value={user.role}
                
                onChange={onChange}
                options={roles}/>

            <SelectInput
                name="isActive"
                label="Is Active"
                value={user.isActive}

                onChange={onChange}
                options={statuses}/>



            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving....' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

export default UserForm;
