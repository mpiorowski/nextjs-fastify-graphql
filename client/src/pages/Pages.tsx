import { Box, Grid } from "@chakra-ui/layout";
import { Center, Tooltip } from "@chakra-ui/react";
import { faComments, faHeadset, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { User } from "../../../@types/users.types";
import { apiRequest } from "../@common/@apiRequest";
import { LoadingPage } from "./@common/LoadingPage";

type Props = {
  children?: ReactElement | ReactElement[];
};

export function findActiveUser(): Promise<User> {
  return apiRequest({
    url: `/auth/user`,
    method: "GET",
  });
}

export function logout(): Promise<void> {
  return apiRequest({
    url: `/auth/logout`,
    method: "POST",
    body: JSON.stringify({}),
  });
}

export const Pages: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();

  const { data: user, isLoading } = useQuery("activeUser", findActiveUser);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!user?.email) {
    router.push("/login");
    return <LoadingPage></LoadingPage>;
  }

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const activeUrl = router.pathname.split("/")[1];
  return (
    <>
      <Grid gridTemplateColumns="60px 1fr" h="100vh">
        <Box backgroundColor="gray.900">
          <Tooltip label="Home" aria-label="home-tooltip" placement="right" shouldWrapChildren>
            <Link href="/">
              <Center
                h="40px"
                _hover={{ color: "gray.400", cursor: "pointer" }}
                m="2"
                borderRadius="4"
                backgroundColor={activeUrl === "" && "gray.600"}
              >
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Center>
            </Link>
          </Tooltip>
          <Tooltip label="Forum" aria-label="forum-tooltip" placement="right" shouldWrapChildren>
            <Link href="/forum/categories">
              <Center
                h="40px"
                _hover={{ color: "gray.400", cursor: "pointer" }}
                m="2"
                borderRadius="4"
                backgroundColor={activeUrl === "forum" && "gray.600"}
              >
                <FontAwesomeIcon icon={faComments} size="lg" />
              </Center>
            </Link>
          </Tooltip>
          <Tooltip label="Chat" aria-label="chat-tooltip" placement="right" shouldWrapChildren>
            <Link href="/chat">
              <Center
                h="40px"
                _hover={{ color: "gray.400", cursor: "pointer" }}
                m="2"
                borderRadius="4"
                backgroundColor={activeUrl === "chat" && "gray.600"}
              >
                <FontAwesomeIcon icon={faHeadset} size="lg" />
              </Center>
            </Link>
          </Tooltip>

          <Tooltip label="Logout" aria-label="logout-tooltip" placement="right" shouldWrapChildren>
            <Center
              h="40px"
              _hover={{ color: "gray.400", cursor: "pointer" }}
              m="2"
              borderRadius="4"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </Center>
          </Tooltip>
        </Box>
        <Box>{children}</Box>
      </Grid>
    </>
  );
};
