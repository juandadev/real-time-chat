import React, { Fragment } from "react";
import Link from "next/link";

export default function login() {
  return (
    <Fragment>
      <h1>Log In</h1>

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Fragment>
  );
}
