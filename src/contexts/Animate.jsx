import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

const animations = {
	hide: {
		opacity: 0,
		// x: '-100%',
		// scale: 0,	
	transition: {	duration: 0.3 }
	},
	show: {
		opacity: 1,
		// x: '-0%',
		// scale: 1,
		transition: {	duration: 0.3 }
	},
}

const motionData = {
	initial: animations.hide,
	animate: animations.show,
	exit: animations.hide
}


function Animate({ children }) {
	const [visible, setVisible] = useState(false);

	useEffect(()=>{
		setTimeout(() => {
			setVisible(true)
		}, 300);
	},[])

	return (<>
	
		{
			visible && 
			<motion.div
				style={{ height: '100%' }}
				{...motionData}
			>
				{children}
			</motion.div >
		}
	</>);
}

export default Animate;