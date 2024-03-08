object Main {
  def checkInList(x: Any, l:List[Any]): Boolean = {
    if(l.isEmpty) return false
    else if(x == l.head) return true
    else return checkInList(x, l.tail)
  }

  def subList(l1: List[Any], l2:List[Any]): Boolean = {
    if(l1.isEmpty) return true
    else return checkInList(l1.head, l2) && subList(l1.tail, l2)
  }
  def main(args: Array[String]): Unit = {

    print(checkInList(0, List(1, 2, 3)))
    println(subList(List(0, 2), List(0, 2, 3, 4)))
    println("Hello world!")
  }
}