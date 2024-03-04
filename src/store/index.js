import { configureStore } from '@reduxjs/toolkit';

// slices
import * as persons from './personsSlice';
import * as admin from './adminSlice';


const reducers = {
	persons: persons.default,
	admin: admin.default,
};

const actions = {
	...persons,
	...admin,
	default: ''
};





export default configureStore({
	reducer: { ...reducers }
})

export {
	reducers,
	actions
};