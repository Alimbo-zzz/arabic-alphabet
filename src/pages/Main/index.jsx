import React, {useEffect} from 'react';
import cls from './style.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {Icon} from '@/components';
import {Animate} from '@/contexts';


function Main (props) {

	const tiles = [		
		{
			route: "/survey",
			text: "Мусхаф",
			icon: "test"
		},
		{
			route: "/persons/attendance",
			text: "Посещаемость",
			icon: "attendance",
		},		
		{
			route: "/persons/group",
			text: "Группы",
			icon: "person-group",
		},
		{
			route: "/persons/list",
			text: "Люди",
			icon: "persons"
		},
		{
			route: "/alphabet",
			text: "Алфавит",
			icon: "alphabet"
		},
		{
			route: "/graph",
			text: "Средние баллы",
			icon: "star",
		},
	]





	const RenderTile = (el, i) => (
	<Link key={i} to={el.route} className={cls.wrap__tile} data-gap={el?.gap}>
		<Icon name={el.icon}/>
		<h4>{el.text}</h4>
	</Link>
	);



	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<h2 className={cls.wrap__title}>Арабский <br /> Центральная мечеть</h2>
				<div className={cls.wrap__tiles}>
					{tiles.map(RenderTile)}
				</div>
			</div>
		</Animate>
	</>);
}

export default Main;