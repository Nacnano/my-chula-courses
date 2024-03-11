package package1

object helloWorld {
  def main(args: Array[String]): Unit = {
    var name = "Tanjiro"
    var age = 15
    println("Hello " + name + ", age = " + age)
    println(s"$name is $age years old.")
    println(f"$name%s is $age%d years old.")
    println(raw"Hello\n World")
  }
}
