import React from 'react';

const TextInput = ({ type, name, value, handleChange, placeholder, error, classes,  ...rest }) => {

    return (
        <div className={classes.root}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={classes.input}
                {...rest}
            />
            {error ? (
                <p className={classes.error}>
                    {error}
                </p>
            ) : null}
        </div>   
    )
}

export default TextInput;
