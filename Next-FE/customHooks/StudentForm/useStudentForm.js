import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { handlePostRequest } from '@/StudentRestApi/studentRestApi';
import { getIfAllObjectKeysAreValid } from '@/utils/objectUtils';
import { 
    validateCharacters, 
    validatePhone,
    validateAge,
    validateEmail
} from '@/utils/formValidations';
import { addStudent } from '@/redux/reducers/students';

const FORM_VALUES_INVALID = "FORM_VALUES_INVALID";

const useStudentForm = (props) => {

    const dispatch = useAppDispatch();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleErrorMessage = useCallback(
        (errorMessage) => {
            setErrorMessage(errorMessage);
        },
        []
    );

    const handleValidation = (values) => {
        let errors = {};

        errors.name = validateCharacters(values.name);
        errors.mobileNumber = validatePhone(values.mobileNumber);
        errors.email = validateEmail(values.email);
        errors.city = validateCharacters(values.city);
        errors.major = validateCharacters(values.major);
        errors.age = validateAge(values.age);

        return errors;
    }

    const handleSubmitForm = useCallback(
        async (formValues) => {
            try {                  
                // console.log("Form Values: ",formValues);

                const isAllFormValuesValid = getIfAllObjectKeysAreValid(formValues);

                if(!isAllFormValuesValid) {
                    throw FORM_VALUES_INVALID;
                }
                            
                const studentDetails = {
                    name: formValues.name,
                    age: formValues.age,
                    major: formValues.major,
                    email: formValues.email,
                    city: formValues.city,
                    gender: formValues.gender,
                    phone: formValues.mobileNumber
                };

                const response = await handlePostRequest(studentDetails);    // REST Put Request API for adding student details 

                dispatch(addStudent(response.data));   // Add New Student Data to Redux Store

                // console.log("Add Student Response: ",response.data);

            } catch(error) {
                if(error === FORM_VALUES_INVALID){
                    handleErrorMessage('Please fill the mandatory fields.');
                    setTimeout(() => setErrorMessage(''),4000);
                } else {
                    console.log('Add Student Details API Error: ',error);
                }
            }
        }, 
        []
    );

    const initialValues = { 
        name: '',
        city: '',
        mobileNumber: '',
        age: '',
        major: '',
        email: '',
        gender: ''
    };

    return {
        errorMessage,
        handleSubmitForm,
        initialValues,
        handleValidation
    }
}

export default useStudentForm;
