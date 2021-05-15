import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Link as UiLink, chakra, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { ColumnInstance, HeaderGroup, useSortBy, useTable } from 'react-table';
import { Pages } from '../../../Pages';
import { apiFindCategoryById } from '../../@common/forumApis';
import Link from 'next/link';

type ColumnData = {
  Header: string;
  accessor: string;
  isNumeric: boolean;
};
export const Topics = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data: categoryData } = useQuery(['category', categoryId], () => apiFindCategoryById(categoryId as string));

  const columns = React.useMemo(
    () => [
      {
        Header: 'Tytuł',
        accessor: 'title',
        Cell: ({ row }) => (
          <Link href={`/forum/categories/${categoryId}/topics/${row.original.id}/posts`}>
            <UiLink color="green.400">{row.original.title}</UiLink>
          </Link>
        ),
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
    [categoryId]
  );
  const tableData = React.useMemo(() => (categoryData ? [...categoryData.category.topics] : []), [categoryData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: tableData }, useSortBy);

  return (
    <Pages>
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
                {row.cells.map((cell, index) => {
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
    </Pages>
  );
};

export default Topics;
