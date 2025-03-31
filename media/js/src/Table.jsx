import React from 'react';
import PropTypes from 'prop-types';

export const Table = ({ headers = [], rows = [], tableClass = '' }) => {
    return (
        <table className={`table table-bordered mb-5 mt-3 ${tableClass}`}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th scope="col" key={index}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                            const Tag = cell.isHeader ? 'th' : 'td';
                            return (
                                <Tag key={cellIndex} scope={cell.isHeader ?
                                    'row' : undefined}>
                                    {cell.content}
                                </Tag>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.node.isRequired,
        isHeader: PropTypes.bool,
    }))),
    tableClass: PropTypes.string,
};


