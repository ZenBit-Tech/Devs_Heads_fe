import { FC } from 'react';
import { Paginate } from './interfaces';

const Pagination: FC<Paginate> = ({ filterPerPage, total, paginate }: Paginate) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(total / filterPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div>
			<ul className="pagination destination">
				{pageNumbers.map(number => (
					<li className="page-item" key={number}>
						<p className="page-link" onClick={() => paginate(number)}>
							{number}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
