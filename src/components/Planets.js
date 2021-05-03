import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import Person from "./Person";

const fetchInfiniteUsers = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${(pageParam - 1) * 20}&limit=20`
  );
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const results = response.json();
  return { items: results, pageParam: pageParam + 1 };
};

const Planets = () => {
  //   const { data, status } = useQuery("planets", fetchPlanets);
  const [page, setPage] = useState(0);

  // Grab all users
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery("users", fetchInfiniteUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pageParam;
    },
  });

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>Something went wrong ...</p>;

  return (
    <div>
      <h2> Planets</h2>

      {data.pages.map((page) => (
        <Person person={page.items} />
      ))}
      {isFetching && <p>Loading ...</p>}
      {hasNextPage && <button onClick={fetchNextPage}>Load More</button>}
    </div>
  );
};

export default Planets;
