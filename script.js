
function Book(title, author, pageNumber, haveRead) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.haveRead = haveRead;
}

function addBookToArray(bookObject) {
    myLibrary.push(bookObject);
    createBookInContainer();
    console.log(myLibrary);
}

function createBookInContainer() {
    
    bookContainer.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];

        // All info elements
        const bookElement = document.createElement("div");
        bookElement.classList.add("card");

        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;

        const pageNumberElement = document.createElement("p");
        pageNumberElement.textContent = `Pages: ${book.pageNumber}`;

        const haveReadElement = document.createElement("div");
        haveReadElement.textContent = `Read: ${book.haveRead === "yes" ? "Yes" : "No"}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(i);
        });

        // Have read button
        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read Status";
        toggleReadButton.classList.add("toggle-read-button");

        
        toggleReadButton.addEventListener("click", () => {
            toggleReadStatus(i);
        });

        // button container
        buttonContainer.appendChild(removeButton);
        buttonContainer.appendChild(toggleReadButton);

        // card container
        bookElement.appendChild(titleElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(pageNumberElement);
        bookElement.appendChild(haveReadElement);
        bookElement.appendChild(buttonContainer);

        // book container
        bookContainer.appendChild(bookElement);
    }
}

function toggleReadStatus(index) {
    myLibrary[index].haveRead = myLibrary[index].haveRead === "yes" ? "no" : "yes"; 
    createBookInContainer(); 
}


function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1); 
    createBookInContainer();
}

function initListeners() {

    const addBookButton = document.querySelector("#add-book");
    const formContainer = document.querySelector("#form-container");
    const overlay = document.querySelector("#overlay");
    

    // add book button
    addBookButton.addEventListener("click", () => {
        formContainer.style.display = "block";
        overlay.style.display = "block";
    })

    // disable overlay and exit form
    window.addEventListener("click", (event) => {
        if (!formContainer.contains(event.target) && event.target !== addBookButton) {
            formContainer.style.display = "none";
            overlay.style.display = "none";
        }
    })

    const bookForm = document.querySelector("#book-form");

    bookForm.addEventListener("submit", function(event){
        event.preventDefault();

        const title = document.querySelector("#title").value;

        console.log(title);

        const author = document.querySelector("#author").value;
        console.log(author)
        const pages = document.querySelector("#pages").value;
        console.log(pages)
        const haveRead = document.querySelector('input[name="have-read"]:checked')?.value;
        console.log(haveRead
        )
        addBookToArray(new Book(title,author,pages,haveRead));

        formContainer.style.display = "none";
        overlay.style.display = "none";
        
    });
}

const myLibrary = [];
initListeners();
const bookContainer = document.querySelector(".book-container");
createBookInContainer();



