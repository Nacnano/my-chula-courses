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

  def main(args:Array[String]): Unit = {
    println(maxAll(List()))
    println(maxAll(List(List())))
    println(maxAll(List(List(1,2,3,4,8,9),List(),List(4,5),List(1,2,3,5,6,10,11))))
    println(maxAll(List(List(3,4),List(1,2,3,4,51,61),List(1,2,31,41,61,51))))
    println(maxAll(List(List(1,2,3,40,5,6),List(10,2,30,4),List(1,200),List(0,0,0,0,0,0,0,0,9))))
  }
}
