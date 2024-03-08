object Question07 {
  def myFilter(f:Int => Boolean) (list:List[Int]) :List[Int] = {
    if(list.isEmpty) return Nil
    else if(f(list.head)) return list.head :: myFilter(f)(list.tail)
    else return myFilter(f)(list.tail)
  }
}
