object Question08 {
  def sum(list: List[Int]): Int = {
    if(list.isEmpty) return 0
    else return list.head + sum(list.tail)
  }
  def sumAll(lists:List[List[Int]]) :List[Int] = {
    if(lists.head.isEmpty) return sumAll(lists.tail)
    else return sum(lists.head) :: sumAll(lists.tail)
  }

}
