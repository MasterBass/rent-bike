import React from 'react';
import {NavLink} from 'react-router-dom';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';

const LoginForm = ({account, errors, logging, onLogin, onChange}) => {
    return (
        <form>
            <h1>Login</h1>
            <p>
                If you don't have account, please &nbsp;
                <NavLink to="/register">Register</NavLink>
            </p>
            <TextInput
                name="email"
                label="Email"
                value={account.email}
                onChange={onChange}
                error={errors.email}/>

            <PasswordInput
                name="password"
                label="Password"
                value={account.password}
                onChange={onChange}
                error={errors.password}/>

            <input
                type="submit"
                disabled={logging}
                value={logging ? 'Logging....' : 'Login'}
                className="btn btn-primary"
                onClick={onLogin}/>
        </form>
    );
};

export default LoginForm;
