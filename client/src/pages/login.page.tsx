import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "../@common/@apiRequest";
import { handleError } from "../@common/@handleError";
import { LoadingPage } from "./@common/LoadingPage";

export default function Login(): JSX.Element {
  const [emailSend, setEmailSend] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: { email: string }) => {
    try {
      await apiRequest({
        url: `/auth/login`,
        method: "POST",
        body: JSON.stringify(values),
      });
      setEmailSend(true);
      return <LoadingPage></LoadingPage>;
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  if (emailSend) {
    return (
      <Flex width="100wh" height="100vh">
        <Box margin="auto" fontSize={22}>
          Sign in link have been sent to the given mail.
        </Box>
      </Flex>
    );
  }
  return (
    <Flex width="100wh" height="100vh">
      <Box margin="auto" width={300}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={errors.email} h="100px">
            <FormLabel>Email</FormLabel>
            <Input title="email" type="email" {...register("email", { required: "Please fill out this field" })} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          {/* <FormControl id="password" isInvalid={errors.password} h="100px">
              <FormLabel>Password</FormLabel>
              <Input
                title="password"
                type="password"
                {...register("password", { required: "Pole nie może być puste" })}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl> */}
          <Button mt={4} width="100%" type="submit" isLoading={isSubmitting}>
            Sign in with email
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
