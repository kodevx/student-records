import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentsList: []
}

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            console.log("addStudent invoked:",action.payload);
            state.studentsList = [...action.payload];
        },
        removeStudent: (state, action) => {
            state.studentsList = state.studentsList.filter(student => student.id !== action.payload);
        }
    }
});

export const { addStudent, removeStudent } = studentSlice.actions;

export default studentSlice.reducer;
