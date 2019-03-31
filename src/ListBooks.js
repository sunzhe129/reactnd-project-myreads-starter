import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class ListBooks extends Component {
    static propTypes = {
        booksInShelves: PropTypes.array.isRequired,
        onGetBooksInShelves: PropTypes.func.isRequired,
        onUpdateBookState: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.onGetBooksInShelves()
    }

    render() {
        const { booksInShelves } = this.props

        let booksCurrentlyReading = booksInShelves.filter((book) => (book.shelf === 'currentlyReading'))
        booksCurrentlyReading.sort(sortBy('title'))

        let booksWantToRead = booksInShelves.filter((book) => (book.shelf === 'wantToRead'))
        booksWantToRead.sort(sortBy('title'))

        let booksRead = booksInShelves.filter((book) => (book.shelf === 'read'))
        booksRead.sort(sortBy('title'))

        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksCurrentlyReading.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue="currentlyReading" onChange={(event) => this.props.onUpdateBookState(book, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.authors.map((author) => (
                                    <div key={author}>{author}</div>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksWantToRead.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue="wantToRead" onChange={(event) => this.props.onUpdateBookState(book, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.authors.map((author) => (
                                    <div key={author}>{author}</div>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksRead.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue="read" onChange={(event) => this.props.onUpdateBookState(book, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">
                                {book.authors.map((author) => (
                                    <div key={author}>{author}</div>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/search">
                <div className="open-search">
                    <button>Add a book</button>
                </div>
            </Link>
          </div>
        )
    }
}

export default ListBooks