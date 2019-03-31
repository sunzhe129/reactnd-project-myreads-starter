import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class SearchBooks extends Component {
    static propTypes = {
        searchBooks: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        onSearchBooks: PropTypes.func.isRequired,
        onUpdateBookState: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.onSearchBooks('')
    }

    render() {
        const { searchBooks, query } = this.props
        searchBooks.sort(sortBy('title'))

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={(event) => this.props.onSearchBooks(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {searchBooks.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={(event) => this.props.onUpdateBookState(book, event.target.value)}>
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
                                {(book.authors) && (book.authors.map((author) => (
                                    <div key={author}>{author}</div>
                                )))}
                              </div>
                            </div>
                          </li>
                        ))}
                </ol>
              </div>
            </div>
        )
    }
}

export default SearchBooks
