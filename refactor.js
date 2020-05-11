// For a discussion on dealing with failures, see this article:
// https://www.joshwulf.com/blog/2020/03/array-async-failure/

function getAttachmentsForBookWithMetadataArray(bookdata) {
  return Object.entries(bookdata)
    .filter(([_, value]) => value.constructor === Array && value.length > 0)
    .map(([fieldname, _]) => getAttachments(fieldname));
}

function getAttachmentsForBook(book) {
  return getBookData(book).then(getAttachmentsForBookWithMetadataArray);
}

function ExportbooksData(books) {
  return !books || !books.length > 0
    ? Promise.reject(new Error("Did not get an array with 1 or more elements"))
    : Promise.all(books.map(getAttachmentsForBook));
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

function getBookData({ name, id }) {
  const book = Books.filter((b) => b.id === id && b.name === name);
  return Promise.resolve(book[0].data);
}

function getAttachments(fieldName) {
  // console.log(Attachments[fieldName]);
  return Promise.resolve(Attachments[fieldName]);
}
