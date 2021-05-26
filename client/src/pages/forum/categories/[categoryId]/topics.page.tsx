import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  Flex,
  Link as UiLink,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ColumnInstance, HeaderGroup, useSortBy, useTable } from "react-table";
import { Pages } from "../../../Pages";
import { useFindCategoryById } from "../../@common/forumApis";
import { TopicDrawer } from "./TopicDrawer";

type ColumnData = {
  Header: string;
  accessor: string;
  isNumeric: boolean;
};
export const Topics = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { categoryData } = useFindCategoryById(categoryId as string);

  const columns = React.useMemo(
    () => [
      {
        Header: "Tytuł",
        accessor: "title",
        Cell: ({ row }) => (
          <Link href={`/forum/categories/${categoryId}/topics/${row.original.id}/posts`}>
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
    [categoryId],
  );
  const tableData = React.useMemo(() => (categoryData ? [...categoryData.topics] : []), [categoryData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: tableData },
    useSortBy,
  );

  return (
    <Pages>
      <TopicDrawer categoryId={categoryId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj temat
        </Button>
      </Flex>
      <Table variant="simple" width="80%" margin="auto" mt="10" {...getTableProps()}>
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
                {row.cells.map((cell, index) => {
                  const column = cell.column as ColumnInstance<any> & ColumnData;
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
    </Pages>
  );
};

export default Topics;
