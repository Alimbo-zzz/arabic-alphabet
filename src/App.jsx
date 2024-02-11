import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alphabet, Main, Persons, Statistic, Testing } from '@/pages';
import {AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';
import { AddPerson, Attendance,  List, GroupPerson, AddGroup, AddAttendance, InfoGroup, InfoPerson, InfoAttendance } from '@/pages/Persons/components';


function App(props) {
	const location = useLocation();
	// const persons = useSelector(state => state.persons.list);
	const persons = [];
	const actions = useActions();


	
	// useEffect(()=>{
	// 	const data = window.localStorage.getItem('arabic-alphabet-persons');
	// 	if(!data || typeof JSON.parse(data) === 'string') return;
	// 	actions.setData(JSON.parse(data));
	// },[])


	// useEffect(()=>{
	// 	if(!persons.length) return;
	// 	window.localStorage.setItem('arabic-alphabet-persons', JSON.stringify(persons))
	// }, [persons])
	

	return (<>
		<div className='wrapper'>
			<AnimatePresence initial={true}>
				<Routes location={location} key={location.pathname}>
					<Route index element={<Main/>}/>
					<Route path="/alphabet" element={<Alphabet/>}/>
					<Route path="/persons">						
						<Route index element={<Persons/>}/>
						<Route path='list' element={<List/>}/>
						<Route path='info-group/:id' element={<InfoGroup/>}/>
						<Route path='info-person/:id' element={<InfoPerson/>}/>
						<Route path='info-attendance/:id' element={<InfoAttendance/>}/>
						<Route path='attendance' element={<Attendance/>}/>
						<Route path='add-person' element={<AddPerson/>}/>
						<Route path='add-group' element={<AddGroup/>}/>
						<Route path='add-attendance' element={<AddAttendance/>}/>
						<Route path='group' element={<GroupPerson/>}/>
					</Route>
					<Route path="/statistic" element={<Statistic/>}/>
					<Route path="/testing" element={<Testing/>}/>
				</Routes>
			</AnimatePresence>
			{/* <Navigation/> */}
		</div>
	</>);
}

export default App;