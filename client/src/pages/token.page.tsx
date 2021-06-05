import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { apiRequest } from "../@common/@apiRequest";
import { LoadingPage } from "./@common/LoadingPage";

export default function Login(): JSX.Element {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.token) {
      apiRequest({
        url: `/auth/token`,
        method: "POST",
        body: JSON.stringify(query.token),
      }).then((response) => {
        if (response) {
          router.push("/");
        } else {
          router.push("/login");
        }
      });
    }
  }, [query]);

  return <LoadingPage></LoadingPage>;
}
