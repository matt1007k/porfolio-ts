import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/form/InputField";
import { createUrlClient } from "../../utils/createUrlClient";
import { toErrorMap } from "../../utils/toErrorMap";
import { useChangePasswordMutation } from "../../generated/graphql";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  const [, changePassword] = useChangePasswordMutation();
  return (
    <Formik
      initialValues={{ newPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          newPassword: values.newPassword,
          token,
        });
        if (response.data?.changePassword.errors) {
          const mapError = toErrorMap(response.data?.changePassword.errors);
          if ("token" in mapError) {
            setTokenError(mapError.token);
          }
          setErrors(mapError);
        } else if (response.data?.changePassword.user) {
          router.push("/");
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <InputField
            label="Contraseña"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
          />
          {tokenError ? (
            <div>
              <div>{tokenError}</div>{" "}
              <NextLink href="/forgot-password">
                forgot password?. One again
              </NextLink>{" "}
            </div>
          ) : null}
          <button>Change password</button>
        </Form>
      )}
    </Formik>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrlClient)(ChangePassword);
