import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alphabet, Main, Persons, Statistic, Testing } from '@/pages';
import {AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';
import { AddPerson, Attendance,  List, GroupPerson, AddGroup, AddAttendance, InfoPerson, InfoAttendance } from '@/pages/Persons/components';
import {AlphabetTest, AddTest, Exam} from '@/pages/Testing/components';
import defaultGroups from '@data/defaultGroups.json';


function App(props) {
	const location = useLocation();
	const personList = useSelector(state => state.persons.list);
	const personExam = useSelector(state => state.persons.exam);
	const personGroup = useSelector(state => state.persons.group);
	const personAttendance = useSelector(state => state.persons.attendance);
	const actions = useActions();
	const query = new URLSearchParams(location.search); 


	function setDefaultData(){
		const groups = JSON.parse(window.localStorage.getItem(`arabic-group`));
		const persons = JSON.parse(window.localStorage.getItem(`arabic-list`));
		if(Array.isArray(groups)){
			defaultGroups.forEach((d_group, i) => {
				let isExist = false;
				groups.find(el => (el.id === d_group.id) && (isExist = true) )
				if(!isExist) actions.addGroup({name: d_group.name, id: d_group.id});
				
				d_group.persons.forEach((person, person_i) => {
					let isExist = false;
					persons.find(el => (el.id === `person-${person_i}`) && (isExist = true))
					if(!isExist) actions.addPerson({name: person.name, group: d_group.id, phone: person.phone, id: `person-${person_i}`});
				})
			})
		}
	}
	
	useEffect(()=>{
		let arr = ['list', 'exam', 'group', 'attendance'];
		arr.forEach((type, i) => {
			const data = window.localStorage.getItem(`arabic-${type}`);
			if(!data || !Array.isArray(JSON.parse(data)) ) return;
			actions.setData({type, data: JSON.parse(data)});
		})

		if(query.get('type') === 'default-data') setDefaultData();
	},[])


	function setDataOnLS(name='', data=[]){
		window.localStorage.setItem(`arabic-${name}`, JSON.stringify(data))
	}


	useEffect(()=>{ setDataOnLS('list', personList) }, [personList])
	useEffect(()=>{	setDataOnLS('exam', personExam) }, [personExam])
	useEffect(()=>{	setDataOnLS('group', personGroup) }, [personGroup])
	useEffect(()=>{ setDataOnLS('attendance', personAttendance) }, [personAttendance])
	


	return (<>
		<div className='wrapper'>
			<AnimatePresence initial={true}>
				<Routes location={location} key={location.pathname}>
					<Route index element={<Main/>}/>
					<Route path="/alphabet" element={<Alphabet/>}/>
					<Route path="/persons">						
						<Route index element={<Persons/>}/>
						<Route path='list' element={<List/>}/>
						<Route path='list/:groupId' element={<List type="group"/>}/>
						<Route path='info-person/:personId' element={<InfoPerson/>}/>
						<Route path='info-attendance/:id' element={<InfoAttendance/>}/>
						<Route path='attendance' element={<Attendance/>}/>
						<Route path='add-person' element={<AddPerson/>}/>
						<Route path='add-group' element={<AddGroup/>}/>
						<Route path='add-attendance' element={<AddAttendance/>}/>
						<Route path='group' element={<GroupPerson/>}/>
					</Route>
					<Route path="/statistic" element={<Statistic/>}/>
					<Route path="/testing">
						<Route index element={<Testing/>} />
						<Route path="alphabet/:testId" element={<AlphabetTest/>} />
						<Route path="exam/:testId" element={<Exam/>} />
						<Route path="add" element={<AddTest/>} />
					</Route>
				</Routes>
			</AnimatePresence>
		</div>
	</>);
}

export default App;