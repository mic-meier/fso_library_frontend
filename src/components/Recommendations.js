import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGED_IN_USER } from "../queries";

const Books = (props) => {
  const results = useQuery(ALL_BOOKS);
  const user = useQuery(LOGGED_IN_USER);

  if (!props.show) {
    return null;
  }

  const books = results.data.allBooks;
  const filter = user.data.me.favoriteGenre;

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
          {books
            .filter((b) => b.genres.includes(filter))
            .map((b) => (
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
