import { useMemo } from 'react'
import { useTable, useSortBy, useGroupBy, usePagination } from 'react-table'
import styles from './TradeTable.module.css'
import useGetTradeActivity from '../../../hooks/useGetTradeActivity'
import useGetCurrentTrade from '../../../hooks/useGetCurrentTrade'


type Props = {
  tableId?: number;
}


const TradeTable = (props: Props) => {

  const { realResult } = useGetCurrentTrade()
  const { currentTotalVol } = useGetCurrentTrade()
  const { tradeDataArr } = useGetTradeActivity()
  const  {totalVol}  = useGetTradeActivity()

  const tradeTable = props.tableId === 1 ? realResult : tradeDataArr
  const tradeDep = props.tableId === 1 ? currentTotalVol : totalVol

    const data = useMemo(
      () => tradeTable,
      [tradeDep]
    )

    
      const columns = useMemo(
        () => [
          {
            Header: "Index",
            accessor: (_row: any, i : number) => i + 1
          },
          {
            Header: 'Protocol',
            accessor: 'col1', // accessor is the "key" in the data
            Cell: (cellProps:any) => {
              return (
                <span className={styles[cellProps.value]}>
                  {cellProps.value}
                </span>
              );
            },
          },
          {
            Header: 'N of Trades',
            accessor: 'col2',
          },
          {
            Header: 'Volume',
            accessor: 'col3',
          }
        ],
        []
      )
      // @ts-ignore
      const tableInstance = useTable(
        //@ts-ignore
        {
          //@ts-ignore
          columns, 
          data, 
          initialState: {
            sortBy: [
              {
                id: 'col3',
                desc: true,
              },
            ],  
            pageSize: 4
          }
        },  
        useSortBy,
        usePagination)

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canNextPage,
        nextPage,
        canPreviousPage,
        previousPage,
        prepareRow,
      } = tableInstance



      
  return (
    <div>
    <table {...getTableProps()} className={styles.mainTable}>
    <thead>
      {headerGroups.map((headerGroup) => {
        const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps()
      return (
        <tr key={key} {...restHeaderGroupProps} className={styles.headRow}>
        {headerGroup.headers.map((column) => {
          const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
          return (
            <th key={key} {...restColumn} className={styles.headKey}>
              {column.render("Header")}
              <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
            </th>
          );
        })}
      </tr>
      )})}
      
    </thead>
    <tbody {...getTableBodyProps()}>
     
    {page.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps} className={styles.mainRow}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps} className={styles.mainKey}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  </table>
  {tradeTable.length > 4 ? 
      
    <><button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button><button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button></> : null}
  </div>
    
)
    
    
      }
export default TradeTable

