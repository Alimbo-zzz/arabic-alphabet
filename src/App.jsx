import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Alphabet, Main, Persons, Statistic, Testing } from '@/pages';
import {Navigation} from '@/components';
import {AnimatePresence} from 'framer-motion';

function App(props) {
	const location = useLocation();

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