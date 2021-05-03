import Navbar from "./components/Navbar";
import Planets from "./components/Planets";
import People from "./components/People";

import { useRef } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { useState } from "react";

import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const [page, setPage] = useState("planets");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <h1> Star Wars Info</h1>
          <Navbar setPage={setPage} />
          <div className="content">
            {page === "planets" ? <Planets /> : <People />}
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App;
