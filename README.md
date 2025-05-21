# 📚 Book Review API

A RESTful API for managing books, user authentication, and reviews using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

## 📦 Features

- User Signup and Login with JWT authentication
- Create, Read, and Search Books
- Submit and Fetch Reviews
- Average rating per book
- Pagination and filtering support
- Protected routes with middleware

---

## 🔧 Project Setup Instructions
### 1. Create a .env file in the root:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookReviewDB
JWT_SECRET=your_jwt_secret_key

### 2. Clone the repo
git clone https://github.com/ShubhamScripter/books-review.git

### 3. Navigate to desire directory
cd book-review-api

### 4. install all required package
npm install

### 5. How to run locally
npm run dev

### 6. Example API requests (Postman)
this is a url of postman json file you can import directlty in postman and directly test api's
https://drive.google.com/file/d/1nmEDPoCNl22dn67GLVt1p8w0aOmw-1-N/view?usp=sharing

steps for run postman json file in postman
1.Launch the Postman application on your machine or use Postman web.
2: Import the JSON File
3.In the top-left corner, click "Import".
4.In the dialog box that opens, choose:

5.File tab (default), then click Upload Files.

6.Select your .json file (Postman Collection or Environment).

7.Click Open → Postman will show a preview.

8.Click Import.


## 🔧 Database schema design
The project uses MongoDB to store and manage the data. Here's a quick overview of how the data is structured:

👤 User
Each user has a unique account. This collection stores their basic credentials.

username: String (required) – must be unique.

email: String (required) – must also be unique.

password: String (hashed before storing).

createdAt: Date – auto-generated timestamp.

📚 Book
This collection stores details about each book added to the system.

title: String (required) – the name of the book.

author: String (required) – the person who wrote the book.

genre: String – can be any genre like fiction, tech, etc.

publishedYear: Number – optional year of publication.

createdAt: Date – timestamp of when the book was added.

✍️ Review
Users can review books. Each review is tied to both a book and a user.

user: ObjectId (ref to User) – who wrote the review.

book: ObjectId (ref to Book) – the book being reviewed.

rating: Number (1 to 5).

comment: String – optional text comment.

createdAt: Date – when the review was posted.

##  ER DIAGRAM
User (1) ────< (Many) Review >──── (1) Book

One User can write many Reviews.
One Book can have many Reviews.
Each Review is linked to both a User and a Book.
