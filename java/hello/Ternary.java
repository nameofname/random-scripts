class Ternary {
    private static boolean boo = false;
    public static void main(String[] args) {
        String value = boo ? "yes" : "no" + " more strings";
        System.out.println("result: " + value);
    }
}