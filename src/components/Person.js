import React, { useState } from "react";

const Person = ({ person }) => {
  const [data, setData] = useState([]);
  person.then((data) => {
    setData(data.results);
  });

  return data.map((d) => <p>{d.name}</p>);
};

export default Person;
