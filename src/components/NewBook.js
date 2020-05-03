import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, FIND_BOOKS_BY_GENRE } from "../queries";
import { CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook);

      const genres = response.data.addBook.genres;

      genres.forEach((genre) => {
        try {
          const booksByGenre = store.readQuery({
            query: FIND_BOOKS_BY_GENRE,
            variables: { genreToSearch: genre },
          });
          store.writeQuery({
            query: FIND_BOOKS_BY_GENRE,
            variables: { genreToSearch: genre },
            data: {
              allBooks: [...booksByGenre.allBooks, response.data.addBook],
            },
          });
        } catch {
          store.writeQuery({
            query: FIND_BOOKS_BY_GENRE,
            variables: { genreToSearch: genre },
            data: {
              allBooks: [response.data.addBook],
            },
          });
        }
      });
    },
  });
  const published = Number(yearPublished);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, author, published, genres } });

    setTitle("");
    setYearPublished("");
    setAuhtor("");
    setGenres([]);
    setGenre("");
    props.setPage("books");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setYearPublished(target.value)}
          />
        </div>
        <div>
          genres:
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
