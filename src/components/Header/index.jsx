import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {Icon} from '@/components';

function Header ({title}) {
	
	return (<>
		<header className={classNames([cls.header, 'container'])} >
			<Link to={'/'}> <Icon name='arrow-bold'/> </Link>
			<h1 className='title'>{title}</h1>
		</header>
	</>);
}

export default Header;