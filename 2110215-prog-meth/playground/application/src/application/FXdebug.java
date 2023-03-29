package application;

public class FXdebug {

    public static void main(String[] args) {
        System.out.println("java.runtime.version: "
                + System.getProperty("java.runtime.version", "(undefined)"));
        System.out.println("javafx.version: "
                + System.getProperty("javafx.version", "(undefined)"));
    }

}
