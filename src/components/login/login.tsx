import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import styles from "./login.module.css";
import StoreCreds from "../../helpers/auth/store_creds";
import GetCostUsage from "../../helpers/aws/getCostUsage";

export default function Login(): JSX.Element {
  const [secretKey, setSecretKey] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  let isSecretError = secretKey.length < 16 || secretKey.length > 128;
  let isAccessError = accessKey.length < 16 || accessKey.length > 128;

  console.log(isAccessError);

  return (
    <div className={styles.login__main}>
      <FormControl
        className={styles.login__form}
        isInvalid={isSecretError || isAccessError}
      >
        <FormLabel className={styles.login__label}>Credentials</FormLabel>
        <Stack className={styles.login__inputs}>
          <Input
            type="password"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder="Enter Access Key"
          ></Input>

          {isAccessError && (
            <FormErrorMessage>
              Access Key must be 16-128 characters
            </FormErrorMessage>
          )}

          {/* <FormLabel>Secret Key</FormLabel> */}
          <Input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter Secret Key"
          />

          {isSecretError && (
            <FormErrorMessage>
              Secret Key must be 16-128 characters
            </FormErrorMessage>
          )}

          {isAuthenticating ? (
            <Button loadingText="Authenticating" colorScheme="pink" isLoading>
              Login
            </Button>
          ) : (
            <Button
              colorScheme="pink"
              onClick={() => {
                if (isSecretError || isAccessError) return;

                setIsAuthenticating(true);
                StoreCreds(secretKey, accessKey);
                // GetCostUsage(
                //   fromDate.toISOString().slice(0, 10),
                //   toDate.toISOString().slice(0, 10)
                // ).then(() => {
                //   setIsAuthenticating(false);
                // });
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </FormControl>
      <h5></h5>
    </div>
  );
}
