object Question09 {
  def turingStep(f:Char => Char,tape:List[Char], n:Int): List[Char] ={
    if(n == 0) tape
    else f(tape.head) :: turingStep(f,tape.tail,n-1)
  }
}
