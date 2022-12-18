// this hello world example shows that you can't default variables
// so i use this getter function
class HelloWorld {
    
    private static String getArg(String[] args) {
        String arg = "something...";
        return (args.length != 0) ? args[0] : arg;
    }
    public static void main(String[] args) {
        System.out.println("Hello world: " + getArg(args));
    }
}