import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const results = useQuery(ALL_BOOKS);
  const [filteredBooksToShow, setFilteredBooksToShow] = useState(null);
  const [filterBooks, filteredBooksResult] = useLazyQuery(FIND_BOOKS_BY_GENRE);

  const handleFilterBooks = (genre) => {
    filterBooks({ variables: { genreToSearch: genre } });
  };

  useEffect(() => {
    if (filteredBooksResult.data) {
      setFilteredBooksToShow(filteredBooksResult.data.allBooks);
    }
  }, [filteredBooksResult.data]);

  if (!props.show) {
    return null;
  }

  const books = results.data.allBooks;
  const genres = [...new Set(books.flatMap((book) => book.genres).sort())];

  if (filteredBooksToShow) {
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
            {filteredBooksToShow.map((b) => (
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
            <button key={g} onClick={() => handleFilterBooks(g)}>
              {g}
            </button>
          ))}
        </div>
        <div>
          <button onClick={() => setFilteredBooksToShow(null)}>
            reset filter
          </button>
        </div>
      </div>
    );
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
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => handleFilterBooks(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
