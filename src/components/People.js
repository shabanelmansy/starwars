import React from "react";

import { useQuery } from "react-query";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  const { data, status } = useQuery("People", fetchPeople);
  return (
    <div>
      <h2> People </h2>
      {status === "loading" && <div> Loading fetching Data</div>}
      {status === "error" && <div> Error fetching Data</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <div> {person.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
