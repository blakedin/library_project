function getTotalBooksCount(books) {
  if (books.length === 0) return 0;
  return books.reduce((result, cur, index, array) => {
    return array.indexOf(cur) + 1;
  });
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    if (book.borrows.some((borrow) => borrow.returned === false)) return book;
  }).length;
}

function getMostCommonGenres(books) {
  const sorted_array = [];
  books.forEach((book, i) => {
    let genre_object = {};
    genre_object.name = book.genre;
    sorted_array.push(genre_object);
  });
  for (let i = 0; i < sorted_array.length; i++) {
    sorted_array[i].count = 0;
    for (let j = 0; j < sorted_array.length; j++) {
      if (sorted_array[i].name === sorted_array[j].name) {
        sorted_array[i].count++;
      }
    }
  }
  const new_array = [];
  for (let i = 0; i < sorted_array.length - 1; i++) {
    if (sorted_array[i].name !== sorted_array[i + 1].name) {
      new_array.push(sorted_array[i]);
    }
  }
  console.log(new_array);

  return new_array.sort((a, b) => b.count - a.count).splice(0, 5);
}

function getMostPopularBooks(books) {
  const popular_books_list = [];
  books.forEach((book) => {
    let book_object = {};
    book_object.name = book.title;
    book_object.count = book.borrows.length;
    popular_books_list.push(book_object);
  });
  return popular_books_list.sort((a, b) => b.count - a.count).splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popular_author_list = [];
  const popular_books_list = books.sort(
    (a, b) => b.borrows.length - a.borrows.length
  );
  popular_books_list.forEach((book) => {
    let author_object = {};
    author_object.count = book.borrows.length;
    const {
      id,
      name: { first, last },
    } = authors.find((author) => author.id === book.authorId);
    if (id === book.authorId) {
      author_object.name = `${first} ${last}`;
    }
    popular_author_list.push(author_object);
  });
  return popular_author_list.splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
