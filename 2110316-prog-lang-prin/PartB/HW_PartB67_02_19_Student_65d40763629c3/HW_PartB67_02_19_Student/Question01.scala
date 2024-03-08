object Question01 {
  def insertLast(x: Any, l:List[Any]): List[Any] ={
    if(l.isEmpty) return List(x)
    else return l.head :: insertLast(x, l.tail)
  }
}
