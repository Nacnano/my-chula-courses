object Question10 {
  def reverse(list:List[Int]):List[Int] = {
    if(list.isEmpty) list
    else reverse(list.tail) ++ List(list.head)
  }
  def solve(f1: (Int,Int) => Int, f2: (Int,Int) => Int)(list:List[Int]):Int = {
    if(list.length == 1) list.head
    else if(list.length % 2 == 0) f1(solve(f1,f2)(list.tail),list.head)
    else f2(solve(f1,f2)(list.tail),list.head)
  }
  def alternate(f1: (Int,Int) => Int, f2: (Int,Int) => Int, list:List[Int]):Int ={
    if(list.isEmpty) 0
    solve(f1,f2)(reverse(list))
  }
}
