import React, {useEffect} from 'react';
import cls from './style.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {Icon} from '@/components';
import {Animate} from '@/contexts';


function Main (props) {

	const tiles = [
		{
			route: "/alphabet",
			text: "Алфавит",
			icon: "alphabet"
		},
		{
			route: "/persons",
			text: "Люди",
			icon: "persons"
		},
		// {
		// 	route: "/statistic",
		// 	text: "Статистика",
		// 	icon: "chart"
		// },
		{
			route: "/graph",
			text: "Чтение Мусхафа",
			icon: "test",
			gap: 2
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