package Homework

object Question09 {

  //val tape = List('C','H','A','R')

  def turingStep(f:Char => Char,tape:List[Char], n:Int): List[Char] ={
   if(tape.isEmpty || n == 0) return tape
   return f(tape.head) :: turingStep(f, tape.tail, n-1)
  }

  def main(args: Array[String]): Unit = {
    val f1 = (x:Char) => x.toLower
    val tape = List('C', 'H', 'A', 'R')
    println(turingStep(f1,tape,2))
    println(turingStep(f1,tape,3))
    println(turingStep(f1,tape,0))
    println(turingStep(f1,tape,5))
  }

}
