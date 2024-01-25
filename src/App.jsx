import React, {useEffect} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alphabet, Main, Persons, Statistic, Testing } from '@/pages';
import {Navigation} from '@/components';
import {AnimatePresence} from 'framer-motion';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';

function App(props) {
	const location = useLocation();
	const persons = useSelector(state => state.persons);
	const actions = useActions();


	
	useEffect(()=>{
		const data = window.localStorage.getItem('arabic-alphabet-persons');
		if(!data || typeof JSON.parse(data) === 'string') return;
		actions.setData(JSON.parse(data));
	},[])


	useEffect(()=>{
		if(!persons.length) return;
		window.localStorage.setItem('arabic-alphabet-persons', JSON.stringify(persons))
	}, [persons])
	

	return (<>
		<div className='wrapper'>
			<AnimatePresence initial={true}>
				<Routes location={location} key={location.pathname}>
					<Route index element={<Main/>}/>
					<Route path="/alphabet" element={<Alphabet/>}/>
					<Route path="/persons" element={<Persons/>}/>
					<Route path="/statistic" element={<Statistic/>}/>
					<Route path="/testing" element={<Testing/>}/>
				</Routes>
			</AnimatePresence>
			{/* <Navigation/> */}
		</div>
	</>);
}

export default App;