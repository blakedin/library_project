//rewrite with DRY
function findAuthorById(authors, id) {
  const author = authors.find((author) => author.id === id);
  return author;
}

function findBookById(books, id) {
  const [book_id] = books.filter((book) => {
    if (book.id === id) return book;
  });
  return book_id;
}

function partitionBooksByBorrowedStatus(books) {
  const returned = [];
  const not_returned = [];
  books.forEach((book) => {
    if (book.borrows.map((b) => b["returned"]).every((e) => e === true)) {
      returned.push(book);
    } else {
      not_returned.push(book);
    }
  });

  return [not_returned, returned];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  accounts.forEach((account) => {
    book.borrows.forEach((borrow, i) => {
      if (account["id"] === borrow.id) {
        account.returned = borrow.returned;
        borrowers.push(account);
      }
    });
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
