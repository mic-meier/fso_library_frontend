import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const results = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState("");

  if (!props.show) {
    return null;
  }

  const books = results.data.allBooks;
  const genres = [...new Set(books.flatMap((book) => book.genres).sort())];

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
          {filter
            ? books
                .filter((b) => b.genres.includes(filter))
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))
            : books.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button
            key={g}
            onClick={({ target }) => setFilter(target.textContent)}
          >
            {g}
          </button>
        ))}
      </div>
      <div>
        <button onClick={() => setFilter("")}>reset filter</button>
      </div>
    </div>
  );
};

export default Books;
