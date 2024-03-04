import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import {Icon} from '@/components';

function Header ({title, nav='/', size=26, home=true}) {
	const navigate = useNavigate();

	const goBack = () => navigate(nav);
	const goHome = () => navigate('/');

	
	return (<>
		<header className={classNames([cls.header])} >
			<button onClick={goBack}> <Icon name='arrow-long'/> </button>
			<h1 style={{fontSize: size}} className={cls.header__title}>{title}</h1>
			{home && <button data-name='home' onClick={goHome}> <Icon name='home'/> </button>}
		</header>
	</>);
}

export default Header;