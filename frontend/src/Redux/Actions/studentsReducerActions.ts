import { Dispatch } from 'redux';
import { studentsReducerActions, studentsReducerActionTypes } from '../Types/studentsReducerTypes';
import axios from 'axios';

export const getAllStudents = () => {
  async (dispatch: Dispatch<studentsReducerActions>) => {
    const getUrl = 'http://localhost:4000/get';
    const response = await axios.get(getUrl);
    dispatch({ type: studentsReducerActionTypes.GET_STUDENTS, payload: response.data });
  };
};
