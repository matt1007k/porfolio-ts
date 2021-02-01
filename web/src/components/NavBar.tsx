import React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    //loading data
  } else if (!data?.me) {
    body = (
      <div style={{ padding: "2rem" }}>
        <NextLink href="/login">Login</NextLink>
        <NextLink href="/register">Register</NextLink>
      </div>
    );
  } else if (data?.me) {
    body = (
      <div style={{ padding: "2rem", display: "flex" }}>
        <span>{data?.me?.username}</span>
        <a
          href="#"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </a>
      </div>
    );
  }
  return <div>{body}</div>;
};
