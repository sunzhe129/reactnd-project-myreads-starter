import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    booksInShelves: [],
    searchBooks: [],
    query: ''
  }

  getBooksInShelves = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        booksInShelves: books
      })
    })
  }

  updateBookState = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let foundInShelves = false
      let updatedBooksInShelves = this.state.booksInShelves.map((bookInShelf) => {
        if (bookInShelf.id === book.id) {
          bookInShelf.shelf = shelf
          foundInShelves = true
        }
        return bookInShelf
      })

      if (!foundInShelves) {
        book.shelf = shelf
        updatedBooksInShelves.push(book)
      }

      this.setState({ booksInShelves: updatedBooksInShelves })
    })
  }

  searchBooks = (query) => {
    let trimmedQuery = query.trim()
    if (trimmedQuery && trimmedQuery.length > 0) {
        BooksAPI.search(trimmedQuery).then((books) => {
          let updatedSearchBooks = []
          if (Array.isArray(books)) {
            updatedSearchBooks = books.map((book) => {
              for (let bookInShelf of this.state.booksInShelves) {
                if (book.id === bookInShelf.id) {
                  book.shelf = bookInShelf.shelf
                }
              }
              return book
            })
          }

          this.setState({
              searchBooks: updatedSearchBooks,
              query: query
          })
        })
    }
    else {
      this.setState({
          searchBooks: [],
          query: ''
      })
    }
  }

  render() {
    return (
      <div className='app'>
          <Route exact path="/" render={ () => (
            <ListBooks
              booksInShelves={this.state.booksInShelves}
              onGetBooksInShelves={() => {
                this.getBooksInShelves()
              }}
              onUpdateBookState={(book, shelf) => {
                this.updateBookState(book, shelf)
              }}
            />
          )}/>
          <Route path="/search" render={ () => (
            <SearchBooks
              searchBooks={this.state.searchBooks}
              query={this.state.query}
              onSearchBooks={(query) => {
                this.searchBooks(query)
              }}
              onUpdateBookState={(book, shelf) => {
                this.updateBookState(book, shelf)
              }}
            />
          )}/>
      </div>
    )
  }
}

export default BooksApp
