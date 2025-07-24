'use client'

import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addStudent, removeStudent } from '@/redux/reducers/students';
import { handleGetRequest, handleDeleteRequest } from '@/StudentRestApi/studentRestApi';

const useHome = (props) => {

    const { studentsList } = useAppSelector(state => state.students);

    const dispatch = useAppDispatch();

    const [isShowStudentForm, setShowStudentForm] = React.useState(false);

    const handleStudentForm = useCallback(() => {
        setShowStudentForm(prevState => !prevState);
    },[]);

    const fetchStudentData = useCallback(
        async () => {
            const response = await handleGetRequest();
            dispatch(addStudent(response.data));
        }, 
        [dispatch]
    );

    React.useEffect(() => {
        fetchStudentData();
    }, [fetchStudentData]);

    const handleDeleteStudent = useCallback(
        async (id) => {
            console.log("delete invoked: ",id);
            handleDeleteRequest(id);

            dispatch(removeStudent(id));    // Remove Student from Redux Store
        },
        [dispatch]
    );

    const students = React.useMemo(() => studentsList, [studentsList]);

    return {
        students,
        isShowStudentForm,
        handleStudentForm,
        handleDeleteStudent
    }
}

export default useHome;

