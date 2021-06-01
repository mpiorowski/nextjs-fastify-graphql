import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra, Link as UiLink, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ColumnInstance, HeaderGroup, useSortBy, useTable } from "react-table";
import { Category } from "../../../../../../@types/forum.types";

type ColumnData = {
  Header: string;
  accessor: string;
  isNumeric: boolean;
};

type Props = {
  category: Category;
};

export default function TopicsTable({ category }: Props): JSX.Element {
  const columns = React.useMemo(
    () => [
      {
        Header: "Tytuł",
        accessor: "title",
        Cell: ({ row }) => (
          <Link href={`/forum/categories/${category.id}/topics/${row.original.id}/posts`}>
            <UiLink color="green.400">{row.original.title}</UiLink>
          </Link>
        ),
      },
      {
        Header: "Opis",
        accessor: "description",
      },
      {
        Header: "Liczba postów",
        accessor: "postsCount",
        isNumeric: true,
      },
    ],
    [category],
  );
  const tableData = React.useMemo(() => {
    const topics = category ? [...category.topics] : [];

    const topicsWithPostsCount = topics.map((topic) => {
      let count = 0;
      topic.posts.forEach((post) => {
        count++;
        count = count + post.replies.length;
      });
      return { ...topic, postsCount: count };
    });

    return topicsWithPostsCount;
  }, [category]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSortBy,
  );

  return (
    <Table variant="simple" width="60%" margin="auto" mt="10" {...getTableProps()}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup & ColumnData) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : (
                    <ArrowUpDownIcon aria-label="sorted default" />
                  )}
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
                const column = cell.column as ColumnInstance & ColumnData;
                return (
                  <Td {...cell.getCellProps()} isNumeric={column.isNumeric}>
                    {cell.render("Cell")}
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
}
