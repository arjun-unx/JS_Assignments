document.addEventListener('DOMContentLoaded', () => {
    const library = new Library();

    function displayBooks() {
        const booksList = document.getElementById('books-list');
        booksList.innerHTML = '';
        const books = library.viewBooks();
        books.forEach(book => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.pages}</td>
                <td>${book.year}</td>
                <td>${book.available ? 'Available' : 'Borrowed'}</td>
                <td>${book.dueDate || '-'}</td>
                <td>
                    <button class="action borrow" onclick="borrowBook(${book.id})">Borrow</button>
                    <button class="action return" onclick="returnBook(${book.id})">Return</button>
                </td>
            `;
            booksList.appendChild(tr);
        });
    }

    function addBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const pages = document.getElementById('pages').value;
        const year = document.getElementById('year').value;

        if (title && author && pages && year) {
            try {
                library.addBook(title, author, genre, pages, year);
                displayBooks();
                clearForm();
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Please fill in all the fields');
        }
    }

    function borrowBook(id) {
        try {
            library.borrowBook(id);
            displayBooks();
        } catch (error) {
            alert(error.message);
        }
    }

    function returnBook(id) {
        try {
            library.returnBook(id);
            displayBooks();
        } catch (error) {
            alert(error.message);
        }
    }

    function clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = 'Fiction';
        document.getElementById('pages').value = '';
        document.getElementById('year').value = '';
    }

    window.addBook = addBook;
    window.borrowBook = borrowBook;
    window.returnBook = returnBook;

    displayBooks();
});
