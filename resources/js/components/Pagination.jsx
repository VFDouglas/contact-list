import {Pagination as NextUIPagination} from '@nextui-org/react';

/**
 * Paginação de registros
 * @author Douglas Vicentini Ferreira
 * @param params.total Total amount of records
 * @param params.maximum Max amount of records per page
 * @param params.page Selected page
 * @param params.callback Callback on page change
 * @param params.controls Indicate if the controls should be shown
 * @param params.shadow Indicates if the shadow should be shown
 * @param params.color Pagination color
 * @constructor
 */
export function Pagination(params = {}) {
    let qtd = params.qtd;
    if (qtd) {
        qtd = 5;
    }
    let paginacao = '';
    if (params.total > params.maximum) {
        let pgs  = Math.ceil(params.total / params.maximum);
        let prim = Math.ceil(params.page - qtd / 2);

        let anterior = params.page - 1;
        let proximo  = params.page + 1;

        return (
            <NextUIPagination
                total={pgs} initialPage={1} className="mt-2" showShadow={params.shadow || false}
                showControls={params.controls || false} page={params.page || 1}
                key={params.key || Math.random().toString()} color={params.color || 'primary'}
                onChange={(page) => {
                    return params.callback({page: page});
                }}/>
        );
    } else {
        return (
            <NextUIPagination className="d-none" total={0}/>
        );
    }
}
