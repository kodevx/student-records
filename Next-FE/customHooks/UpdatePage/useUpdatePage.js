import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { handleUpdateRequest } from '@/StudentRestApi/studentRestApi';
import { getIfAllObjectKeysAreValid } from '@/utils/objectUtils';
import { 
    validateCharacters, 
    validatePhone,
    validateAge,
    validateEmail
} from '@/utils/formValidations';
import { addStudent } from '@/redux/reducers/students';

const FORM_VALUES_INVALID = "FORM_VALUES_INVALID";

const useUpdatePage = (props) => {

    const { id } = props;

    // console.log("id: ",id,typeof(id));

    const dispatch = useAppDispatch();
    const { studentsList } = useAppSelector(state => state.students);

    const [isDetailsUpdated, setIsDetailsUpdated] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null);
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
                console.log("Form Values: ",formValues);

                const isAllFormValuesValid = getIfAllObjectKeysAreValid(formValues);

                if(!isAllFormValuesValid) {
                    throw FORM_VALUES_INVALID;
                }
                            
                const studentDetails = {
                    id,
                    name: formValues.name,
                    age: formValues.age,
                    major: formValues.major,
                    email: formValues.email,
                    city: formValues.city,
                    gender: formValues.gender,
                    phone: formValues.mobileNumber
                };

                const response = await handleUpdateRequest(studentDetails);    // REST Put Request API for adding student details 

                dispatch(addStudent(response.data));    // Add New Student Data to Redux Store

                console.log("Add Student Response: ",response.data);

                setIsDetailsUpdated(true);
                setUpdateStatus('The Student Details has been updated.');

            } catch(error) {
                if(error === FORM_VALUES_INVALID) {
                    handleErrorMessage('Please fill the mandatory fields.');
                    setTimeout(() => setErrorMessage(''),4000);
                } else {
                    console.log('Add Student Details API Error: ',error);
                }
            } finally {
                if(updateStatus) {
                    setTimeout(() => setUpdateStatus(''),4000);
                }
            }
        }, 
        [
            id, 
            setUpdateStatus, 
            setErrorMessage, 
            dispatch,
            updateStatus,
            handleErrorMessage
        ]
    );

    console.log("studentList: ",studentsList);

    const studentToUpdate = studentsList.find(student => student.id === id);

    console.log("studentToUpdate: ",studentToUpdate);

    const initialValues = 
        studentToUpdate ? {
            name: studentToUpdate.name,
            city: studentToUpdate.city,
            mobileNumber: studentToUpdate.phone,
            age: studentToUpdate.age,
            major: studentToUpdate.major,
            email: studentToUpdate.email,
            gender: studentToUpdate.gender
        } : { 
            name: '',
            city: '',
            mobileNumber: '',
            age: '',
            major: '',
            email: '',
            gender: ''
        };

    return {
        isDetailsUpdated,
        studentToUpdate: [studentToUpdate],
        updateStatus,
        errorMessage,
        initialValues,
        handleSubmitForm,
        handleValidation
    }
}

export default useUpdatePage;

