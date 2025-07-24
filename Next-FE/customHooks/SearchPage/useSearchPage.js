import { useCallback, useState } from 'react';
import { handleSearchRequest } from '@/StudentRestApi/studentRestApi';
import { 
    validateCharacters, 
    validateEmail
} from '@/utils/formValidations';
import { createObjWithValidKeys } from '@/utils/objectUtils';

const ALL_FORM_VALUES_EMPTY = 'ALL_FORM_VALUES_EMPTY';

const useSearchPage = (props) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [studentData, setStudentData] = useState([]);

    const handleErrorMessage = useCallback(
        (errorMessage) => {
            setErrorMessage(errorMessage);
        },
        []
    );

    const handleStudentData = useCallback(
        (data) => setStudentData(data),
        [setStudentData]
    );

    const handleValidation = (values) => {
        let errors = {};

        errors.name = validateCharacters(values.name);
        errors.gender = validateEmail(values.gender);
        errors.city = validateCharacters(values.city);
        errors.major = validateCharacters(values.major)

        return errors;
    }

    const handleSubmitForm = useCallback(
        async (formValues) => {
            try {                  
                console.log("Search Page Form Values: ",formValues);

                const isAllFormValuesEmpty = !!( 
                    formValues.name === '' &&
                    formValues.major === '' && 
                    formValues.city === '' && 
                    formValues.gender === ''
                );

                if(isAllFormValuesEmpty) {
                    throw ALL_FORM_VALUES_EMPTY;
                }
                            
                const studentDetails = createObjWithValidKeys(formValues);

                console.log("studentDetails: ",studentDetails);

                const response = await handleSearchRequest(studentDetails);     // REST Put Request API for adding student details 

                console.log("Search Results Student Response: ",response.data);
                if(response.data) {
                    handleStudentData(response.data);
                } else {
                    setErrorMessage('Student record couldn\'t be found!');
                    setTimeout(() => setErrorMessage(''),4000);
                }

            } catch(error) {
                if(error === ALL_FORM_VALUES_EMPTY) {
                    handleErrorMessage('Please enter atleast one field.');
                    setTimeout(() => setErrorMessage(''),4000);
                } else {
                    console.log('Add Student Details API Error: ',error);
                }
            }
        }, 
        [handleStudentData, handleErrorMessage]
    );

    const initialValues = { 
        name: '',
        city: '',
        gender: '',
        major: ''
    };

    return {
        studentData,
        errorMessage,
        handleSubmitForm,
        initialValues,
        handleValidation
    }
}

export default useSearchPage;
