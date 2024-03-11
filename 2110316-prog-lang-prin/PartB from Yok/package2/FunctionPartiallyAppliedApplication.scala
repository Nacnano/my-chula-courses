package package2
import java.util.Date // java

object FunctionPartiallyAppliedApplication {
  def dateMessage(date: Date, s:String):Unit = {
    println(date + ", " + s)
  }

  def main(args: Array[String]): Unit = {
    var date = new Date
    var newMessage = dateMessage(date, _:String)
    for(i <- 0 to 5) {
      Thread.sleep(300)
      date = new Date
      newMessage("message " + i)
    }
  }
}
