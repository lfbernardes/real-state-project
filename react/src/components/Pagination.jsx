import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginate = ({currentPage, itemsPerPage, totalItems, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationItem disabled={currentPage <= 1}>
                <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
            {pageNumbers.map(number => (
                <PaginationItem active={number === currentPage} key={number}>
                    <PaginationLink onClick={() => paginate(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}
            <PaginationItem disabled={currentPage >= Math.ceil(totalItems/itemsPerPage)}>
                <PaginationLink next onClick={() => paginate(currentPage + 1)} />
            </PaginationItem>
        </Pagination>
    );
}

export default Paginate;
