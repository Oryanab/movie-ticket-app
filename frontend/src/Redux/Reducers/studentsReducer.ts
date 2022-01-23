import { studentsReducerActions, Students, studentsReducerActionTypes } from '../Types/studentsReducerTypes';

const studentsReducer = (state: Students[], action: studentsReducerActions) => {
  switch (action.type) {
    case studentsReducerActionTypes.GET_STUDENTS:
      return (state = action.payload);
    default:
      return state;
  }
};

export default studentsReducer;
