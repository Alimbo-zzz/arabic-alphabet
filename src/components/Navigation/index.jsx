import React from 'react';
import cls from './style.module.scss';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';

function Navigation (props) {
	
	return (<>
		<div className={classNames(['container', cls.wrap])}>
			<NavLink to="/">main</NavLink>
			<NavLink to="/persons">person</NavLink>
			<NavLink to="/testing">test</NavLink>
		</div>
	</>);
}

export default Navigation;