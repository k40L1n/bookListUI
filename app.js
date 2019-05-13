// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  //create tr element
  const row = document.createElement("tr");
  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};
// Show Alert
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement("div");
  //add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  //insert alert
  container.insertBefore(div, form);
  // time out after 2s
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};
// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  // Validate
  if (title === " " || author === "" || isbn === "") {
    // Error Alert
    ui.showAlert("Please fill in all fields", "error");
  }
  // Add book to list
  ui.addBookToList(book);

  // Show add book success
  ui.showAlert("Book added !", "success");

  // Clear fields

  ui.clearFields();
  //clear fields
  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  //instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  //Show message
  ui.showAlert("Book Removed", "success");
  e.preventDefault();
});
