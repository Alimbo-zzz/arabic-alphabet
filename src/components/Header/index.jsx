import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import {Icon} from '@/components';

function Header ({title, nav='/'}) {
	const navigate = useNavigate();

	const back = () => navigate(nav);

	
	return (<>
		<header className={classNames([cls.header])} >
			<button onClick={back}> <Icon name='arrow-long'/> </button>
			<h1 className={cls.header__title}>{title}</h1>
		</header>
	</>);
}

export default Header;