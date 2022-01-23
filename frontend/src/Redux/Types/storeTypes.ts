import { appReducers } from '../Store/combine';

export type State = ReturnType<typeof appReducers>;
