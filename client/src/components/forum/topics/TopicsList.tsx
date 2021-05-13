import { Flex, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { apiFindCategoryById } from '../../../pages/forum/@common/forumApis';

export const TopicsList = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { data } = useQuery(['category', categoryId], () => apiFindCategoryById(categoryId as string));

  return (
    <Table variant="simple" width="80%" margin="auto" mt="10">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th>Tytuł</Th>
          <Th>Opis</Th>
          <Th isNumeric>Liczba postów</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
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
