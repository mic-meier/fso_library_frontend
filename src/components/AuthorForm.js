import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS } from "./Authors";

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    const setBornTo = Number(birthYear);
    editBirthYear({ variables: { name, setBornTo } });

    setBirthYear("");
    setName("");
  };

  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  return (
    <div>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <Select options={options} onChange={({ value }) => setName(value)} />

          <div>
            born:{" "}
            <input
              type="text"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          <div>
            <button type="submit">update author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorForm;
