import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, useNavigate } from 'react-router-dom';
import {useActions} from '@/hooks';


const Graph = (props) => {
	const groups = useSelector(state => state.persons.group);
	const arr = groups.map(el => ({...el, visible: true}))
	const navigate = useNavigate();

	
	const renderItem = el => (
		<AnimatePresence key={el.id}>
			{
				el.visible &&
				<motion.li 
					className={cls.item}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					onClick={() => navigate(el.id)}
				>
					<h4>{el.name}</h4>
				</motion.li>
			}
		</AnimatePresence>
	);

	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title={"Список групп"} nav={-1}/>
				</div>

				<ul className={cls.list}>
					{arr.map(renderItem)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default Graph;