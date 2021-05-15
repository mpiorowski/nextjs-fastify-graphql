import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { chakra, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { ColumnInstance, HeaderGroup, useSortBy, useTable } from 'react-table';
import { apiFindCategoryById } from '../../../pages/forum/@common/forumApis';

type ColumnData = {
  Header: string;
  accessor: string;
  isNumeric: boolean;
};

type TableData = {
  title: string;
  description: string;
  postsCount: number;
};

export const TopicsList = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: categoryData } = useQuery(['category', categoryId], () => apiFindCategoryById(categoryId as string));

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tytuł',
        accessor: 'title',
      },
      {
        Header: 'Opis',
        accessor: 'description',
      },
      {
        Header: 'Liczba postów',
        accessor: 'postsCount',
        isNumeric: true,
      },
    ],
    []
  );
  const data = React.useMemo(() => [...categoryData.category.topics], []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

  return (
    <Table variant="simple" width="80%" margin="auto" mt="10" {...getTableProps()}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup & ColumnData) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
                {column.render('Header')}
                <chakra.span pl="4">
                  {column.isSorted ? column.isSortedDesc ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" /> : <ArrowUpDownIcon aria-label="sorted default" />}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const column = cell.column as ColumnInstance<any> & ColumnData;
                return (
                  <Td {...cell.getCellProps()} isNumeric={column.isNumeric}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};
