import { FC, useEffect, useMemo, useState } from 'react';
import { Paginate } from './interfaces';

const Pagination: FC<Paginate> = ({ filterPerPage, total, paginate }: Paginate) => {
	const [pageNumber, setPageNumber] = useState<Array<number>>([1]);
	useEffect(() => {
		const page: Array<number> = [];
		for (let i = 1; i <= Math.ceil(total / filterPerPage); i++) {
			page.push(i);
		}
		setPageNumber(page);
	}, [total]);
	return (
		<div>
			<ul className="pagination destination">
				{pageNumber.length > 1 &&
					pageNumber.map(number => (
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
