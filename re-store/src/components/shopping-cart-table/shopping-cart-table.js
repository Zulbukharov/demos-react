import React from 'react';
import './shopping-cart-table.css';
import { connect } from 'react-redux';
import { onBookDeletedFromCart, onBookIncreased, onBookDecresed } from '../../actions';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
	return (
		<div className="shopping-cart-table">
			<h2>Your Order</h2>
			<table className="table">
				<thead>
					<tr>
						<th>
							#
						</th>
						<th>
							Item
						</th>
						<th>
							Price
						</th>
						<th>
							Count
						</th>
						<th>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{
						items.map((item, idx) => {
							const { id, title, count, total } = item;
							return (
								<tr key={id}>
									<td>{idx}</td>
									<td>{title}</td>
									<td>{total}</td>
									<td>{count}</td>
									<td>
										<button
											onClick={() => onDelete(id)}
											className="btn btn-outline-danger">
											<i className="fa fa-trash-o" />
										</button>

										<button
											onClick={() => onIncrease(id)}
											className="btn btn-outline-success">
											<i className="fa fa-plus-circle" />
										</button>

										<button
											onClick={() => onDecrease(id)}
											className="btn btn-outline-warning">
											<i className="fa fa-minus-circle" />
										</button>
									</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>

			<div className="total">
				{total}$
			</div>
		</div>
	)
};

const mapStateToProps = ({ cartItems, orderTotal }) => {
	return {
		items: cartItems,
		total: orderTotal,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIncrease: (id) => dispatch(onBookIncreased(id)),
		onDecrease: (id) => dispatch(onBookDecresed(id)),
		onDelete: (id) => dispatch(onBookDeletedFromCart(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);