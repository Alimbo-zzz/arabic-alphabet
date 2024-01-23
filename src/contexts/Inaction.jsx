import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Inaction({ children, timeout = 120, onFinish }) {
	const navigate = useNavigate();
	const [counter, setCounter] = useState(timeout);

	const closeFunc = () => typeof onFinish === 'function' && onFinish();
	const resetTimer = () => setCounter(timeout);

	useEffect(() => {
		if (counter !== 'finish') return;
		navigate('/');
		(typeof closeFunc === 'function') && closeFunc();
	}, [counter])

	useEffect(() => {
		const timer = setInterval(() => setCounter(prev => prev > 0 ? prev - 1 : 'finish'), 1000);
		return () => clearInterval(timer);
	}, [])

	return (<>
		<div style={{height: "100%"}} onTouchStart={resetTimer} onMouseDown={resetTimer}>{children}</div>
	</>);
}

export default Inaction;