package oldQuiz

object q2_2022_sec02 {
  def exist(x: Any, l: List[Any]):Boolean = {
    if(l.isEmpty) return false
    if(x == l.head) return true
    exist(x,l.tail)
  }
  def count(l1:List[Any],l2:List[Any]):Int = {
    if(l1.isEmpty) return 0
    if(exist(l1.head,l2)) return 1 + count(l1.tail,l2)
    count(l1.tail,l2)
  }
  def moreThanHalf(l1:List[Any],l2:List[Any]):Boolean = {
    if(l1.isEmpty) return false
    count(l1,l2) >= l1.length.toFloat/2
  }

  def main(args: Array[String]): Unit = {
    println(moreThanHalf(List(1, 2, 3), List(1, 2, 3, 4, 5, 6)))
    println(moreThanHalf(List(1, 2, 3, 4, 5), List(1, 2)))
  }
}
