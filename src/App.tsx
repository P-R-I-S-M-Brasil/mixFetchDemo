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
    "AQRRAs9oc8QWXAFBs44YhCKUny7AyLsfLy91pwmGgxuf.CWUKoKA1afSKyw5BnFJJg19UDgnaVATupsFhQpyTEBHJ@EBT8jTD8o4tKng2NXrrcrzVhJiBnKpT1bJy5CMeArt2w",
  mixFetchOverride: {
    requestTimeoutMs: 60_000,
  },
  forceTls: true,
  extra,
};

export function GetPrice() {
  const [coin, setCoin] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currency, setCurrency] = React.useState("");
  const [result, setResult] = React.useState("");

  async function get() {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
      coin +
      "&vs_currencies=" +
      currency +
      "&x_cg_demo_api_key=" +
      process.env.REACT_APP_API_KEY;

    setIsLoading(true);
    try {
      const response = await mixFetch(
        url,
        { mode: "unsafe-ignore-cors" },
        mixFetchOptions,
      );
      const obj = await response.json();
      const price = obj[coin][currency];
      if (price === undefined) throw new Error("undefined query");
      setResult("1 " + coin + " = " + price + currency);
    } catch (err) {
      setResult(
        "Could not query the coin " + coin + " in the currency " + currency,
      );
    }
    setIsLoading(false);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter coin"
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      />
      <button onClick={get}>Get price</button>
      {isLoading ? <h3>Fetching...</h3> : <h3>{result}</h3>}
    </>
  );
}

export default function App() {
  return (
    <div>
      <GetPrice />
    </div>
  );
}
