import { createSlice, current } from '@reduxjs/toolkit';

const admin = createSlice({
	name: 'admin',
	initialState: {
		isAdmin: false,
	},
	reducers: {
		setIsAdmin(state, {payload}){
			if(typeof payload !== 'boolean') return; 
			state.isAdmin = payload;
		}
	}
})

const { actions, reducer } = admin;


export const { 
	setIsAdmin
} = actions;
export default reducer;