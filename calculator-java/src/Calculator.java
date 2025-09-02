import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.println("=== Simple Java Calculator ===");
        System.out.print("Enter first number: ");
        double a = readDouble(in);

        System.out.print("Enter operator (+ - * /): ");
        String op = in.next();

        System.out.print("Enter second number: ");
        double b = readDouble(in);

        double result;
        switch (op) {
            case "+": result = a + b; break;
            case "-": result = a - b; break;
            case "*": result = a * b; break;
            case "/":
                if (b == 0) {
                    System.out.println("Error: Division by zero!");
                    in.close();
                    return;
                }
                result = a / b; 
                break;
            default:
                System.out.println("Unknown operator: " + op);
                in.close();
                return;
        }

        System.out.println("Result: " + result);
        in.close();
    }

    private static double readDouble(Scanner in) {
        while (true) {
            try {
                return Double.parseDouble(in.next());
            } catch (NumberFormatException e) {
                System.out.print("Not a number, try again: ");
            }
        }
    }
}
