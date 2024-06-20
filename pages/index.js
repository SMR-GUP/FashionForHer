import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>EShop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <div>
        <h1 style={{ fontSize: "40px", textAlign: "center" }}>
          Where Style Meets Convenience!!
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/pedro-miranda-nAJWJNh2UFI-unsplash.jpg"
            alt="Image loading..."
            style={{ width: "40%", height: "700px" }}
          ></img>
          <img
            src="/home2.jpeg"
            alt="Image loading..."
            style={{ width: "40%", height: "700px" }}
          ></img>
        </div>
      </div>
    </>
  );
}
