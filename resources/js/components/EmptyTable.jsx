import {Skeleton} from '@nextui-org/react';
import {Col, Row} from 'react-bootstrap';

/**
 *
 * @param props
 * @param {boolean} props.isLoading Indicates if the table is loading
 * @param {number} props.rows Amount of lines
 * @param {number} props.columns Amount of columns
 * @returns {JSX.Element}
 * @constructor
 */
export function EmptyTable(props = {}) {
    if (props.isLoading) {
        let rows  = [];
        let columns = [];
        for (let i = 0; i < (props.rows || 1); i++) {
            rows.push(i);
        }
        for (let j = 0; j < (props.columns || 1); j++) {
            columns.push(j);
        }
        return (
            <>
                {rows.map((linha) => (
                    <Row key={`linha-${linha}`} className="my-3">
                        {
                            (columns).map((column) => (
                                <Col key={`column-${column}`}>
                                    <Skeleton key={`placeholder-${column}`} className="w-3/5 rounded-1 h-3"/>
                                </Col>
                            ))
                        }
                    </Row>
                ))}
            </>
        );
    } else {
        return (
            <>Your search returned no results</>
        );
    }
}
