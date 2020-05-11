// https://stackoverflow.com/questions/61724541/array-of-promises-in-a-promise-array#61724617

function ExportbooksData(books) {
  return new Promise((resolve, reject) => {
    if (books && books.length > 0) {
      const aPromises = [];
      for (let i = 0; i < books.length; i++) {
        const id = books[i].id;
        const name = books[i].name;
        aPromises.push(
          getBooksData(name, id, null).then((results) => {
            const aAttachmentPromises = [];
            Object.entries(results).forEach(([key, value]) => {
              let fieldName = key;
              if (value.constructor === Array && value.length > 0) {
                aAttachmentPromises.push(
                  getAttachments(fieldName) //.then((fileContent) => {})
                );
              }
            });
            return aAttachmentPromises;
          })
        );
      }

      // Resolve when all are done!
      Promise.all(aPromises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    }
  });
}

/**
 * Testing code below this line
 */

const Books = [
  {
    id: 0,
    name: "Bible",
    data: {
      0: [0],
    },
  },
  {
    id: 1,
    name: "Koran",
    data: {
      1: [1],
    },
  },
  {
    id: 2,
    name: "Bhagavad-gita",
    data: {
      2: [2],
    },
  },
  {
    id: 3,
    name: "The Selfish Gene",
    data: {
      3: [3],
    },
  },
];

const Attachments = [
  "Bible Attachment",
  "Koran Attachment",
  "Bhagavad-gita Attachment",
  "The Selfish Gene Attachment",
];

ExportbooksData(Books).then(console.log);

function getBooksData(name, id) {
  const book = Books.filter((book) => book.id === id && book.name === name);
  // console.log(book[0]);
  return Promise.resolve(book[0].data);
}

function getAttachments(fieldName) {
  // console.log(Attachments[fieldName]);
  return Promise.resolve(Attachments[fieldName]);
}
