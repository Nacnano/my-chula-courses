object Question02 {
  def insertInOrder(x: Int, l:List[Int]): List[Int] ={
    if(l.isEmpty) return List(x)
    else if(x <= l.head) return x :: l
    else return l.head :: insertInOrder(x, l.tail)
  }
}
