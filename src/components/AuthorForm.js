import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
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

const AuthorForm = () => {
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

  return (
    <div>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            name:{" "}
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
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
