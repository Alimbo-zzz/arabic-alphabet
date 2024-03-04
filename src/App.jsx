import React, {useEffect, useState} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alphabet, Main, Persons, Graph, Statistic, Testing } from '@/pages';
import {AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';
import { AddPerson, Attendance,  List, GroupPerson, AddGroup, AddAttendance, InfoPerson, InfoAttendance } from '@/pages/Persons/components';
import GraphGroup from '@/pages/Graph/GraphGroup';
import {AlphabetTest, AddTest, Exam} from '@/pages/Testing/components';
import defaultGroups from '@data/defaultGroups.json'; 	
import req from '@/scripts/req';

const baseURL = 'https://arabic-masjid-git-master-alimbo-zzz.vercel.app';


function App(props) {
	const location = useLocation();
	const personList = useSelector(state => state.persons.list);
	const personExam = useSelector(state => state.persons.exam);
	const personGroup = useSelector(state => state.persons.group);
	const personAttendance = useSelector(state => state.persons.attendance);
	const actions = useActions();
	const query = new URLSearchParams(location.search); 
	const [serverData, setServerData] = useState({isStart: false, persons: [], groups: [], attendance: []});



	async function setDefaultData(){
		try {
			const ops = {method: "GET", redirect: "follow"};
			const personsAPI = await fetch(`${baseURL}/getData?type=persons`, ops);
			const groupsAPI = await fetch(`${baseURL}/getData?type=groups`, ops);

			const persons = await personsAPI.json();
			const groups = await groupsAPI.json();

			if(!Array.isArray(groups)) return ;
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
		} catch (error) {
			console.log(error)
		}
		
	}


	function stateSetter(){
		let arr = ['list', 'group', 'attendance'];

		let obj = { 
			list: serverData?.persons,
			group: serverData?.groups,
			attendance: serverData?.attendance
		}

		arr.forEach((type, i) => {
			let data = obj[type]; 
			if(!data || !Array.isArray(data) ) return;
			actions.setData({type, data});
		})
	}

	async function getServerData() {
		try {
			const ops = {method: "GET", redirect: "follow"};			
			const personsAPI = await fetch(`${baseURL}/getData?type=persons`, ops);
			const groupsAPI = await fetch(`${baseURL}/getData?type=groups`, ops);
			const attendanceAPI = await fetch(`${baseURL}/getData?type=attendance`, ops);

			const persons = await personsAPI.json();
			const groups = await groupsAPI.json();
			const attendance = await attendanceAPI.json();
			
			setServerData(prev => ({...prev, isStart: true, persons, groups, attendance }))
		} catch (error) {
			console.log(error)
		}
	}


	function checkAdmin() {
		if(query.get('admin') === 'true') {
			window.localStorage.setItem('admin', 'true');
			actions.setIsAdmin(true);
		}
		if(window.localStorage.getItem('admin') === 'true') actions.setIsAdmin(true);	
	}
	
	useEffect(checkAdmin,[])
	useEffect(stateSetter,[serverData])
	useEffect(() => { 
		setDefaultData().finally(getServerData);
	},[])


	function setDataOnLS(name='', data=[]){
		let obj = {type: name, value: data};
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(obj);

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(`${baseURL}/setData?type=attendance`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
	}


	// useEffect(()=>{	setDataOnLS('exam', personExam) }, [personExam])
	useEffect(()=>{ serverData.isStart && setDataOnLS('persons', personList) }, [personList])
	useEffect(()=>{ serverData.isStart &&	setDataOnLS('groups', personGroup) }, [personGroup])
	useEffect(()=>{ serverData.isStart && setDataOnLS('attendance', personAttendance) }, [personAttendance])
	


	return (<>
		<div className='wrapper'>
			<AnimatePresence initial={true}>
				<Routes location={location} key={location.pathname}>
					<Route index element={<Main/>}/>
					<Route path="/alphabet" element={<Alphabet/>}/>
					<Route path='/graph' element={<Graph/>} />
					<Route path='/graph/:groupId' element={<GraphGroup/>}/>	
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