import React from "react";
import "./App.css";
import { mixFetch, SetupMixFetchOps } from "@nymproject/mix-fetch-full-fat";

const extra = {
  hiddenGateways: [
    {
      owner: "n1kymvkx6vsq7pvn6hfurkpg06h3j4gxj4em7tlg",
      host: "gateway1.nymtech.net",
      explicitIp: "213.219.38.119",
      identityKey: "E3mvZTHQCdBvhfr178Swx9g4QG3kkRUun7YnToLMcMbM",
      sphinxKey: "CYcrjoJ8GT7Dp54zViUyyRUfegeRCyPifWQZHRgMZrfX",
    },
  ],
};

const mixFetchOptions: SetupMixFetchOps = {
  preferredGateway: "E3mvZTHQCdBvhfr178Swx9g4QG3kkRUun7YnToLMcMbM",
  preferredNetworkRequester:
    "GiRjFWrMxt58pEMuusm4yT3RxoMD1MMPrR9M2N4VWRJP.3CNZBPq4vg7v7qozjGjdPMXcvDmkbWPCgbGCjQVw9n6Z@2xU4CBE6QiiYt6EyBXSALwxkNvM7gqJfjHXaMkjiFmYW",
  mixFetchOverride: {
    requestTimeoutMs: 60_000,
  },
  forceTls: true,
  extra,
};

export function GetFile() {
  const [html, setHtml] = React.useState("");
  async function get() {
    const response = await mixFetch(
      "https://raw.githubusercontent.com/W3bS3rv3r/webserver/main/Makefile",
      { mode: "unsafe-ignore-cors" },
      mixFetchOptions,
    );

    const text = await response.text();
    console.log("response was", text);
    setHtml(html);
  }

  return (
    <>
      <button
        onClick={() => {
          get();
        }}
      >
        Get
      </button>
    </>
  );
}

export default function App() {
  return (
    <div>
      <GetFile />
    </div>
  );
}
