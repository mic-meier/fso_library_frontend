import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { FIND_BOOKS_BY_GENRE, LOGGED_IN_USER } from "../queries";

const Books = (props) => {
  const user = useQuery(LOGGED_IN_USER);
  const [filterBooks, results] = useLazyQuery(FIND_BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    filterBooks({ variables: { genreToSearch: user.data?.me?.favoriteGenre } });
  }, [user.data, filterBooks]);

  useEffect(() => {
    if (results.data) {
      setBooks(results.data.allBooks);
    }
  }, [results.data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
