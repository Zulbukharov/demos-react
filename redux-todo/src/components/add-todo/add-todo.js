import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions';
import './add-todo.css';
const AddTodo = ({ dispatch }) => {
	let input;

	return (
		<div className="add-todo">
			<form className="input-group mb-3" onSubmit={
				(e) => {
					e.preventDefault();
					if (!input.value.trim()) {
						return
					};
					dispatch(addTodo(input.value));
					input.value = '';
				}
			}>
				{/* <div className="form-group"> */}
				<input className="form-control" ref={node => input = node} />

				{/* </div> */}
				<div class="input-group-append">
					<button type="submit" className="btn btn-success ">Add todo</button>
				</div>

			</form>
		</div>
	)
};

export default connect()(AddTodo);