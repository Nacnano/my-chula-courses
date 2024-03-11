package Sec02

object applySeq {
  def applySeq(x:Int) (fList: List[Int=>Int]): Int = {
    if(fList.isEmpty) return x
    applySeq(fList.head(x))(fList.tail)
  }

  def main(args: Array[String]): Unit = {
    println(applySeq(1)(List((x => x+1), (x => x*x),(x => x+5)) ))
    println(applySeq(100)(List()))
  }
}
