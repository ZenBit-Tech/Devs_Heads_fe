import { FC, useEffect, useMemo, useState } from 'react';
import { Paginate } from './interfaces';

const Pagination: FC<Paginate> = ({ filterPerPage, total, paginate }: Paginate) => {
	const [pageNumber, setPageNumber] = useState<Array<number>>([1]);
	const page = Math.ceil(total / filterPerPage);
	useEffect(() => {
		for (let i = 1; i <= Math.ceil(total / filterPerPage); i++) {
			setPageNumber([i]);
		}
	}, [page]);

	return (
		<div>
			<ul className="pagination destination">
				{pageNumber.map(number => (
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
