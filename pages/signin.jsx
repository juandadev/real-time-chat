import React, { Fragment } from "react";
import Link from "next/link";

export default function signin() {
  return (
    <Fragment>
      <h1>Sign In</h1>

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Fragment>
  );
}