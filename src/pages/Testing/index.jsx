import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon} from '@/components';
import cls from './style.module.scss'
import { Link } from 'react-router-dom';

function Testing (props) {
	const routes = [
		{
			// styles: {background: "linear-gradient(to bottom, #FFD600, #BF7910)"},
			icon: 'alphabet', 
			path: 'alphabet', 
			text: 'Алфавит'
		}
	]


	const renderLink = (el, i) => (
		<Link 
			to={el.path} 
			key={i} 
			className={cls.item}
			style={el.styles}
		>
			<h2>{el.text}</h2>
			<Icon name={el.icon}/>
		</Link>
	);

	return (<Animate>	
		<div className={cls.wrap}>
			<div className="container">
				<Header title="Тесты"/>
			</div>
			<nav className={cls.nav}>
				{routes.map(renderLink)}
			</nav>
		</div>
	</Animate>);
}

export default Testing;