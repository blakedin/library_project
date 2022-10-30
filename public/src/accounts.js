function findAccountById(accounts, id) {
  const account = accounts.find((acc) => acc.id === id);
  return account;
}

function sortAccountsByLastName(accounts) {
  const accounts_by_last_name = accounts.sort((a, b) =>
    a.name.last > b.name.last ? 1 : -1
  );
  return accounts_by_last_name;
}

function getTotalNumberOfBorrows(account, books) {
  return books.filter((book) => {
    if (
      book.borrows
        .map((borrow) => {
          return borrow.id;
        })
        .includes(account.id)
    )
      return book;
  }).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  //refactor this code. it's ugly
  const books_Possesed = books.filter((book) => {
    if (
      book.borrows
        .map((borrow, i) => {
          return borrow.id;
        })
        .includes(account.id)
    ) {
      const [{ ...status }] = book.borrows.filter(
        (borrow) => borrow.id === account.id
      );

      if (!status.returned) {
        const [newAuthor] = authors
          .filter((author) => {
            if (author.id === book.authorId) return author;
          })
          .map((a) => {
            return a;
          });

        book.author = newAuthor;
        return book;
      }
    }
  });

  return books_Possesed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
