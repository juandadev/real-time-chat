import Link from "next/link";
import React from "react";
import Layout from "../src/components/Layout";

export default function signin() {
  return (
    <Layout>
      <h1>Sign In</h1>

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </Layout>
  );
}
