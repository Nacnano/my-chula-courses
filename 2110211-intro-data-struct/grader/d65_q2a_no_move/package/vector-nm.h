#ifndef _CP_VECTOR_NM_INCLUDED_
#define _CP_VECTOR_NM_INCLUDED_

#include <stdexcept>
#include <iostream>
#include <vector>
//#pragma once

namespace CP {

template <typename T>
class vector_no_move
{

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
    vector_no_move(const vector_no_move<T>& a) {
      mData = a.mData;
      mCap = a.mCap;
      mSize = a.mSize;
    }

    // default constructor
    vector_no_move() {
      mCap = 0;
      mSize = 0;
    }

    // copy assignment operator using copy-and-swap idiom
    vector_no_move<T>& operator=(vector_no_move<T> other) {
      // other is copy-constructed which will be destruct at the end of this scope
      // we swap the content of this class to the other class and let it be descructed
      using std::swap;
      swap(this->mSize, other.mSize);
      swap(this->mCap, other.mCap);
      swap(this->mData, other.mData);
      return *this;
    }

    ~vector_no_move() {
    }

    //------------- capacity function -------------------
    bool empty() const {
      return mSize == 0;
    }

    size_t size() const {
      return mSize;
    }

    size_t capacity() const {
      return mCap;
    }

    void resize(size_t n) {
      //resize is guaranteed to be called with MORE THAN mCap
      if (n > mCap) {
        ensureCapacity(n);
        mSize = n;
      }
    }

    //----------------- access -----------------
    T& operator[](int index);

    //T& operator[](int index) const;

    void expand_hook();

    //----------------- modifier -------------
    void push_back(const T& element) {

      //since we guaranteed that vector is always full, 
      //this will always add additional vector to mData
      //with just ONE additional member
      ensureCapacity(mSize+1);

      //set the last one to be element
      mData.back().back() = element;
      mSize++;
    }

    void debug() {
      std::cout << "--- debug ---\nmSize = " << mSize << " mCap = " << mCap << std::endl;
      for (size_t i = 0;i < mData.size();i++) {
        std::cout << "mData[" << i << "]: ";
        for (size_t j = 0;j < mData[i].size();j++) {
          std::cout << mData[i][j] << " ";
        }
        std::cout << std::endl;
      }
      std::cout << "aux: ";
      for (auto &x : aux) std::cout << x << " ";
      std::cout << std::endl;
    }

};

}

#endif


