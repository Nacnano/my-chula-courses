object Question08 {

  def sumAll(lists:List[List[Int]]) :List[Int] = {
    if(lists.isEmpty) Nil
    else if(lists.length == 1) lists.head
    else {
      var ans = sumAll(lists.tail)
      if(lists.head.isEmpty) ans
      else if(ans.isEmpty) lists.head
      else  (lists.head.head+ans.head) :: sumAll(List(lists.head.tail, ans.tail))
    }
  }
}
