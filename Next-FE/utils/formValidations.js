

const SUCCESS = '';

export const validateCharacters = (value) => {
    const regex = /^[a-z A-Z]+$/;
    return regex.test(value) 
        ? SUCCESS
        : 'Please enter valid character(s).'  
}

export const isRequired = (value) => {
    if(value) {
        return SUCCESS;
    } else {
        return 'This field is required.';
    }
}

export const validatePhone = (value) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(value) ? SUCCESS : 'Enter a valid phone number.'
}

export const validateEmail = (value) => {
    const regex = /^[a-zA-Z]+[.]*[a-zA-Z]*[0-9]*@[a-z]+[.{1}][a-z]+$/
    return regex.test(value) ? SUCCESS : 'Enter a valid email address (eg.john.doe@gmail.com)';
}

export const validateAge = (value) => {
    const regex = /^[1-9]{1}[0-9]{1}$/;
    return regex.test(value) ? SUCCESS : 'Enter your age.'
}

export const digitsOnly = (value) => {
    const regex = /^[0-9]+$/;
    return regex.test(value) ? SUCCESS : 'Enter digits only.' ;
}
