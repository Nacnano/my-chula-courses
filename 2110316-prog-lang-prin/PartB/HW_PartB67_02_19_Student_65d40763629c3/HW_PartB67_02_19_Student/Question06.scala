object Question06 {
  def myMap(f:Int => Int) (list:List[Int]) :List[Int] = {
    if(list.isEmpty) return Nil
    else return f(list.head) :: myMap(f)(list.tail)
  }
}
