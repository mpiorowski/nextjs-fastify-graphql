import { createStandaloneToast } from "@chakra-ui/react";

export function handleError(errors: Record<string, string> | Record<string, string>[]): void {
  const toast = createStandaloneToast();

  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    });
  } else {
    toast({
      title: errors.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
  }
}
