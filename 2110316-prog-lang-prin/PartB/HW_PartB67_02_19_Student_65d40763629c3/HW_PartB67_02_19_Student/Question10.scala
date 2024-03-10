object Question10 {
  def L(list:List[Int]):List[Int] = {
    if(list.isEmpty) list
    else L(list.tail) ++ List(list.head)
  }
  def G(f1: (Int,Int) => Int, f2: (Int,Int) => Int)(list:List[Int]):Int = {
    if(list.length == 1) list.head
    else if(list.length % 2 == 0) f1(G(f1,f2)(list.tail),list.head)
    else f2(G(f1,f2)(list.tail),list.head)
  }
  def alternate(f1: (Int,Int) => Int, f2: (Int,Int) => Int, list:List[Int]):Int ={
    if(list.isEmpty) 0
    G(f1,f2)(L(list))
  }
}
