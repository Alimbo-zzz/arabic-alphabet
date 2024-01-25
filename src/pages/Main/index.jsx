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
		{
			route: "/statistic",
			text: "Статистика",
			icon: "chart"
		},
		{
			route: "/testing",
			text: "Тестирование",
			icon: "test"
		},
	]





	const RenderTile = (el, i) => (
	<Link key={i} to={el.route} className={cls.wrap__tile}>
		<Icon name={el.icon}/>
		<h4>{el.text}</h4>
	</Link>
	);



	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<h1 className={cls.wrap__title}>Арабский алфавит</h1>
				<div className={cls.wrap__tiles}>
					{tiles.map(RenderTile)}
				</div>
			</div>
		</Animate>
	</>);
}

export default Main;