import { configureStore } from '@reduxjs/toolkit';

// slices
import * as persons from './personsSlice';


const reducers = {
	persons: persons.default,
};

const actions = {
	...persons,
	default: ''
};





export default configureStore({
	reducer: { ...reducers }
})

export {
	reducers,
	actions
};