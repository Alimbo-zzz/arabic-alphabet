import React from 'react';
import {Animate} from '@/contexts';
import {Header, Icon } from "@/components";
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import cls from './style.module.scss'


function Persons (props) {

	const routes = [
		{
			styles: {background: "linear-gradient(to bottom, #FFD600, #BF7910)"},
			icon: 'attendance', 
			path: 'attendance', 
			text: 'Посещаемость'
		},
		{
			styles: {background: "linear-gradient(to bottom, #00E0FF, #1080BF)"},
			icon: 'person-list', 
			path: 'list', 
			text: 'Список людей'
		},
		{
			styles: {background: "linear-gradient(to bottom, #CC00FF, #7210BF)"},
			icon: 'person-group', 
			path: 'group', 
			text: 'Группы'
		},
		{
			styles: {background: "linear-gradient(to bottom, #00ED5F, #00A410)"},
			icon: 'person-add', 
			path: 'add-person', 
			text: 'Добавить человека'
		},
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
	

	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title="Люди"/>
					<nav className={cls.nav}>
						{routes.map(renderLink)}
					</nav>
				</div>
			</div>
		</Animate>
	</>);
}

export default Persons;