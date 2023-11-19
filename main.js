// Classes 

// A single book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class BookShelf {
    constructor(book) {
        // Create container element
        this.element = document.createElement('div');
        this.element.classList.add('book');
        this.element.dataset.id = book.title;

        // Title label and title
        this.title = document.createElement('div');
        this.title.textContent = book.title;
        this.title.classList.add('book-title');
        this.element.appendChild(this.title);

        // Author div
        this.authorDiv = document.createElement('div');
        this.authorDiv.classList.add('book-info');
        
        // Author label
        this.authorLabel = document.createElement('span');
        this.authorLabel.textContent = 'By';
        this.authorLabel.classList.add('book-label');
        this.authorDiv.appendChild(this.authorLabel);

        // Author
        this.author = document.createElement('span');
        this.author.textContent = book.author;
        this.authorDiv.appendChild(this.author);
        
        // Append to element
        this.element.appendChild(this.authorDiv);



        // Pages div
        this.pagesDiv = document.createElement('div');
        this.pagesDiv.classList.add('book-info');

        // Pages label
        this.pagesLabel = document.createElement('span');
        this.pagesLabel.textContent = 'Pages';
        this.pagesLabel.classList.add('book-label');
        this.pagesDiv.appendChild(this.pagesLabel);

        // Pages 
        this.pages = document.createElement('span');
        this.pages.textContent = book.pages;
        this.pagesDiv.appendChild(this.pages);

        // Append pages div to element
        this.element.appendChild(this.pagesDiv);



        // Read div
        this.readDiv = document.createElement('div');
        this.readDiv.classList.add('book-info');

        // Read label
        this.readLabel = document.createElement('span');
        this.readLabel.textContent = 'Read';
        this.readLabel.classList.add('book-label');
        this.readDiv.appendChild(this.readLabel);

        // Read or not checkbox
        this.read = document.createElement('input');
        this.read.type = 'checkbox';
        this.read.classList.add('checkbox');
        this.read.checked = book.read;
        this.readDiv.appendChild(this.read);

        // Append read div to element
        this.element.appendChild(this.readDiv);

      

        // Delete button
        this.delete = document.createElement('button');
        this.delete.classList.add('delete-button');
        this.delete.addEventListener("click", function() {
            deleteBook(book);
        });
        this.element.appendChild(this.delete);

        bookShelf.appendChild(this.element);
    }
}



// Functions 

// Add book and display
function addToLib(book) {
    // Add to array
    myLibrary.push(book);
    // Display books and details
    displayAllBooks();
    displayDetails();
}
 
function deleteBook(deletedBook) {
    console.log(myLibrary);
    myLibrary = myLibrary.filter(book => book !== deletedBook);
    console.log(myLibrary);
    displayAllBooks();
    displayDetails();
}


// Clears shelf then display
function displayAllBooks() {
    while (bookShelf.firstChild) {
        bookShelf.removeChild(bookShelf.firstChild);
    }
    myLibrary.map((b) => new BookShelf(b));

    console.log(bookShelf);
}

// Display lib details
function displayDetails() {
    totalBooks.textContent = myLibrary.length;
    totalRead.textContent = myLibrary.filter(book => book.read === true).length;
    totalUnread.textContent = myLibrary.filter(book => book.read === false).length;
}

// Exits out of modal form
function closeModal() {
    modal.style.display = 'none';
    console.log("Close Model Function Ran");
}

// Submit form function
function submitForm() {
    // Dont navigate to different page
    event.preventDefault();
    // Gets data from form and adds it to the library
    console.log('Form Submitted');

    // Add to book array here
    const newTitle = title.value;
    const newAuthor = author.value;
    const newPages = pages.value;
    const newRead = read.checked;

    const newBook = new Book(newTitle, newAuthor, newPages, newRead);

    addToLib(newBook);

    closeModal();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}



// Executed code 

// Initializers

// Master library
myLibrary = [];

// Div tag for where the books go
const bookShelf = document.querySelector('.book-shelf');

// Variables to be displayed on the left
const totalBooks = document.querySelector('#total-books');
const totalRead = document.querySelector('#total-read');
const totalUnread = document.querySelector('#total-unread');

// Variables for the modal to get info for a new book
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

// Example Books
const HarryPotter = new Book("Harry Potter 1", "J.K. Rowling", 223, false);
const Dune = new Book("Dune", "Frank Herbert", 896, false);
const Tom = new Book("The Adventures of Tom Sawyer", "Mark Twain", 168, true);
const Got = new Book("A Game of Thrones", "George R.R. Martin", 694, false);

// Add them to lib
myLibrary.push(HarryPotter);
myLibrary.push(Dune);
myLibrary.push(Tom);
myLibrary.push(Got);

// Modal form
const modal = document.getElementById('add-book-modal');

let addBookButton = document.querySelector('#add-book');
addBookButton.addEventListener("click", function() {
    modal.style.display = 'block';
    console.log("Add Book Button CLicked");
})

// Live search -- look at the Javascript 30 project

// Display all books in existing library
displayAllBooks();
// Display library states on side
displayDetails();