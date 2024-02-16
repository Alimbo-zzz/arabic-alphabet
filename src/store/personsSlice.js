import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as setId } from 'uuid';

const persons = createSlice({
	name: 'persons',
	initialState: {
		list: [
			// {
			// 	id: 'user-1',
			// 	name: 'Алим Мамбетов',
			// 	phone: '89994921293',
			//	group: 'group-id'
			// },
		],
		group: [
			// { 
			// 	id: 'group-1', 
			// 	name: 'Группа №1',
			// 	data: ['user-1']
			// },
		],
		attendance: [
			// {
			// 	id: 'attendance-1',
			// 	date: new Date().getTime(),
			// 	name: 'Урок №1',
			// 	data: [
			// 		{personId: 'user-1', status: 'absent'},
			// 		{personId: 'user-2', status: 'attend'},
			// 	]
			// },
		],
		exam: [
			// {
			// 	id: 'exam-1',
			// 	type: 'alphabet',
			// 	name: 'alphabet-1',
			// 	date: new Date().getTime(),
			// 	data: []
			// }
		]
	},
	reducers: {
		addPerson: (state, {payload}) => { 
			const {name, phone, group='', id=null} = payload;
			let newObj = { id: id || setId(), name, phone, group }
			state.list.unshift(newObj)
			
			const findGroup = state.group.find(el => el.id === group);
			if(findGroup) findGroup.data.push(newObj.id);
		 },
		changePerson: (state, {payload}) => {
			const {id, phone, group, name} = payload;
			let findPerson = state.list.find(el => el.id === id);
			if(findPerson){
				findPerson.phone = phone;
				findPerson.group = group;
				findPerson.name = name;
			}
		},
		updateGroupToPerson: (state, {payload}) => {
			let {groupId, personId} = payload;
			let findPerson = state.list.find(el => el.id === personId);
			if(!findPerson) return;
			state.group.map(({data, ...ops}) => ({...ops, data: data.filter(id => id !== personId)}))
			findPerson.group = groupId;
			let findGroup = state.group.find(el => el.id === groupId);
			if(findGroup) findGroup.data.unshift(personId);			
		},
		addGroup: (state, {payload}) => {
			let {name, id} = payload; 
			let newObj = { id: id || setId(), name, data: [] }
			state.group.unshift(newObj)
		 },
		addAttendance: (state, {payload: name}) => { 
			let newObj = { id: setId(), name, date: new Date().getTime(), data: [] }
			state.attendance.unshift(newObj)
		 },
		changeAttendancePerson: (state, {payload}) => {
			let {personId, status, id} = payload;
			let findItem = state.attendance.find(el => el.id === id);
			if(!findItem) return;
			let findPerson = findItem?.data?.find(el => el.personId === personId);
			if(findPerson) findPerson.status = status;
			else findItem.data.push({personId, status});
		},
		addExam: (state, {payload}) => {
			let {name, type} = payload;
			let obj = {
				id: setId(),
				type,	name,
				date: new Date().getTime(),
				data: []
			}
			state.exam.unshift(obj);
		},
		addTestOnPerson(state, {payload}){
			let {length_answers, true_answers, personId, id} = payload;		
			let exams = state.exam.find(el => el.id === id)?.data;
			let findPerson = exams.find(el => el.personId === personId);
			let obj = {	personId, length_answers, true_answers };
			if(!findPerson) exams.unshift(obj);
			else for (const key in obj) { findPerson[key] = obj[key]; }
		},
		deleteItem: (state, {payload}) => {
			let {id, type} = payload;
			let types = {
				list: () => state.list = state.list.filter(el => el.id !== id),
				group: () => state.group = state.group.filter(el => el.id !== id),
				attendance: () => state.attendance = state.attendance.filter(el => el.id !== id), 
				exam: () => state.exam = state.exam.filter(el => el.id !== id),
			}
			if(typeof types[type] === 'function') types[type]();
		},
		setData: (state, {payload}) => {
			let {type, data} = payload;
			let types = {
				list: () => state.list = data,
				group: () => state.group = data,
				attendance: () => state.attendance = data,
				exam: () => state.exam = data,
			}
			if(typeof types[type]) types[type]();
			else console.log('error');
		},
	}
})

const { actions, reducer } = persons;


export const { 
	addPerson, addGroup, addAttendance, 
	changeAttendancePerson, addExam,		
	addTestOnPerson, deleteItem, setData,
	changePerson, updateGroupToPerson,
} = actions;
export default reducer;