import { studentsReducerActions, Students, studentsReducerActionTypes } from '../Types/studentsReducerTypes';
const initState: Students[] = [];
const studentsReducer = (state: Students[] = initState, action: studentsReducerActions) => {
  switch (action.type) {
    case studentsReducerActionTypes.GET_STUDENTS:
      return (state = action.payload);
    default:
      return state;
  }
};

export default studentsReducer;
