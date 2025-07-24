'use client';

const Button = (props) => {

    const { 
        label,
        styles, 
        handleClick,
        isDisabled,
        children,
        ...rest
    } = props;

    return (
        <button
            disabled={isDisabled}
            className={styles}
            onClick={handleClick}
            {...rest}
        >
            {children ? children : label}
        </button>
    )
}

Button.defaultProps = {
    isDisabled: false
}

export default Button;
