import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as setId } from 'uuid';

const persons = createSlice({
	name: 'persons',
	initialState: {
		list: [
			{
				id: 'user-1',
				name: 'Алим Мамбетов',
				phone: '89994921293',
			},
			{
				id: 'user-2',
				name: 'Ибрахим Мурачаев',
				phone: '82349887564',
			}
		],
		group: [
			{ 
				id: 'group-1', 
				name: 'Группа №1',
				persons: ['user-1']
			},
			{	
				id: 'group-2', 
				name: 'Группа №2',
				persons: ['user-2']
			},
		],
		attendance: [
			{
				id: 'attendance-1',
				date: new Date().getTime(),
				name: 'Урок №1',
				data: [
					{personId: 'user-1', status: 'absent'},
					{personId: 'user-2', status: 'attend'},
				]
			},
			{
				id: 'attendance-2',
				date: new Date().getTime(),
				name: 'Урок №2',
				data: []
			},
			{
				id: 'attendance-3',
				date: new Date().getTime(),
				name: 'Урок №3',
				data: []
			},
		],
		exam: [
			{
				id: 'exam-1',
				type: 'alphabet',
				name: 'alphabet-1',
				date: new Date().getTime(),
				data: []
			}
		]
	},
	reducers: {
		addPerson: (state, {payload}) => { 
			const {name, phone, group} = payload;
			let newObj = {
				id: setId(),
				name, group, phone,
				attendance: [],
				exam: []
			}
			state.list.unshift(newObj)
		 },
		addGroup: (state, {payload: name}) => { 
			let newObj = { id: setId(), name }
			state.group.unshift(newObj)
		 },
		addAttendance: (state, {payload: name}) => { 
			let newObj = { id: setId(), name, date: new Date().getTime() }
			state.attendance.unshift(newObj);
		 },
		changeAttendancePerson: (state, {payload}) => {
			let {personId, status, id} = payload;
			let findItem = state.attendance.find(el => el.id === id);
			if(!findItem) return;
			let findPerson = findItem?.data?.find(el => el.personId === personId);
			if(findPerson) findPerson.status = status;
			else findItem.data.push({personId, status});
		},
		addTestOnPerson(state, {payload: {id, data}}){
			const persons = current(state.list);
			return persons.map(el => {
				if(el.id !== id) return el;
				let newData = [...el.data, [...data]];
				return ({...el, data: newData})
			})
		},
		deletePerson: (state, {payload: id}) => current(state.list).filter(el => el.id !== id),
		setData: (state, {payload: data}) => state.list = data,
	}
})

const { actions, reducer } = persons;


export const { addPerson, addGroup, addAttendance, changeAttendancePerson,
		
addTestOnPerson, deletePerson, setData } = actions;
export default reducer;