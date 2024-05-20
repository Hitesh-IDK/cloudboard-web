import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import styles from "./login.module.css";

export default function Login(): JSX.Element {
  const [secretKey, setSecretKey] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const isSecretError = secretKey.length < 16 || secretKey.length > 128;
  const isAccessError = accessKey.length < 16 || accessKey.length > 128;

  return (
    <div className={styles.login__main}>
      <FormControl className={styles.login__form}>
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
        </Stack>
      </FormControl>
    </div>
  );
}
