"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { Box, Heading } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box as="main">
      <Heading as="h1">HOME PAGE</Heading>
    </Box>
  );
}
