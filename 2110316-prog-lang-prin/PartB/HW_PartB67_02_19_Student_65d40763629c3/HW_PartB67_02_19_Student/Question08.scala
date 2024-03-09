object Question08 {
  def sumAll(lists:List[List[Int]]) :List[Int] = {
    if(lists.isEmpty) Nil
    else if(lists.length == 1) lists.head
    else {
      var g = sumAll(lists.tail)
      if(lists.head.isEmpty) g
      else if(g.isEmpty) lists.head
      else  (lists.head.head+g.head) :: sumAll(List(lists.head.tail, g.tail))
    }
  }
}
