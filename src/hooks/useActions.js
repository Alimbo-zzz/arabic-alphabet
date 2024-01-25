import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '@/store';

const allActions = { ...actions };

export default (reducerName) => {
	const dispatch = useDispatch();

	return bindActionCreators(allActions, dispatch);
};
