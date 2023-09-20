#ifndef _CP_VECTOR_SM_INCLUDED_
#define _CP_VECTOR_SM_INCLUDED_

#include <algorithm>
#include <iostream>
#include <stdexcept>
#include <vector>

//#pragma once

namespace CP {

template <typename T> class vector_some_move {

protected:
  std::vector<std::vector<T>> mData;
  size_t mCap;
  size_t mSize;
  std::vector<int> aux;

  void expand(size_t capacity) {
    int additional_capacity = capacity - mCap;
    mData.push_back(std::vector<T>(additional_capacity));
    mCap = capacity;

    expand_hook();
  }

  void ensureCapacity(size_t capacity) {
    if (capacity > mCap) {
      expand(capacity);
    }
  }

public:
  //-------------- constructor & copy operator ----------

  // copy constructor
  vector_some_move(const vector_some_move<T> &a) {
    mData = a.mData;
    mCap = a.mCap;
    mSize = a.mSize;
    aux = a.aux;
  }

  // default constructor
  vector_some_move() {
    mCap = 0;
    mSize = 0;
  }
  // constructor from vector
  vector_some_move(const std::vector<std::vector<T>> &t) {
    mData = t;
    for (size_t i = 0; i < mData.size(); ++i) {
      if (i == 0) {
        aux.push_back(mData[i].size());
      } else {
        aux.push_back(aux[i - 1] + mData[i].size());
      }
    }
    mCap = aux.back();
    mSize = aux.back();
  }

  // copy assignment operator using copy-and-swap idiom
  vector_some_move<T> &operator=(vector_some_move<T> other) {
    // other is copy-constructed which will be destruct at the end of this scope
    // we swap the content of this class to the other class and let it be
    // destructed
    using std::swap;
    swap(this->mSize, other.mSize);
    swap(this->mCap, other.mCap);
    swap(this->mData, other.mData);
    swap(this->aux, other.aux);
    return *this;
  }

  ~vector_some_move() {}

  //------------- capacity function -------------------
  bool empty() const { return mSize == 0; }

  size_t size() const { return mSize; }

  size_t capacity() const { return mCap; }

  void resize(size_t n) {
    // resize is guaranteed to be called with MORE THAN mCap
    if (n > mCap) {
      ensureCapacity(n);
      mSize = n;
    }
  }

  //----------------- access -----------------
  T &operator[](int idx) {
    int i = std::upper_bound(aux.begin(), aux.end(), idx) - aux.begin();
    if (i > 0)
      idx -= aux[i - 1];
    return mData[i][idx];
  }

  void expand_hook() { aux.push_back(mCap); }

  //----------------- modifier -------------
  void push_back(const T &element) {
    // since we guaranteed that vector is always full,
    // this will always add additional vector to mData
    // with just ONE additional member
    ensureCapacity(mSize + 1);

    // set the last one to be element
    mData.back().back() = element;
    mSize++;
  }

  void insert(int index, std::vector<T> &value);

  void debug() {
    std::cout << "--- debug ---\nmSize = " << mSize << " mCap = " << mCap
              << std::endl;
    for (size_t i = 0; i < mData.size(); i++) {
      std::cout << "mData[" << i << "]: ";
      for (size_t j = 0; j < mData[i].size(); j++) {
        std::cout << mData[i][j] << " ";
      }
      std::cout << std::endl;
    }
    std::cout << "aux: ";
    for (auto &x : aux)
      std::cout << x << " ";
    std::cout << std::endl;
  }
};

} // namespace CP

#endif
