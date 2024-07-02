
class Book {
    constructor(id, title, author, genre, pages, year, available = true, dueDate = null) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.year = year;
        this.available = available;
        this.dueDate = dueDate;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }

    addBook(title, author, genre, pages, year) {
        const newBook = new Book(this.nextId++, title, author, genre, pages, year);
        this.books.push(newBook);
        return newBook;
    }

    viewBooks() {
        return this.books;
    }

    borrowBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book && book.available) {
            book.available = false;
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14); // Set due date 2 weeks from today
            book.dueDate = dueDate.toLocaleDateString();
            return book;
        } else if (book && !book.available) {
            throw new Error('Book is already borrowed');
        } else {
            throw new Error('Book not found');
        }
    }

    returnBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book && !book.available) {
            book.available = true;
            book.dueDate = null;
            return book;
        } else if (book && book.available) {
            throw new Error('Book was not borrowed');
        } else {
            throw new Error('Book not found');
        }
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = Library;
} else {
    window.Library = Library;
}
