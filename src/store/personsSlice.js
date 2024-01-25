import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as setId } from 'uuid';

const persons = createSlice({
	name: 'persons',
	initialState: [],
	reducers: {
		addPerson: (state, {payload: name}) => { state.unshift({id: setId(), name,  data:[]}) },
		addTestOnPerson(state, {payload: {id, data}}){
			const persons = current(state);
			return persons.map(el => {
				if(el.id !== id) return el;
				let newData = [...el.data, [...data]];
				return ({...el, data: newData})
			})
		},
		deletePerson: (state, {payload: id}) => current(state).filter(el => el.id !== id),
		setData: (state, {payload: data}) => state = data,
	}
})

const { actions, reducer } = persons;


export const { addPerson, addTestOnPerson, deletePerson, setData } = actions;
export default reducer;