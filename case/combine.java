
public class Main {
	/*一个简单的求组合数的程序*/
	public static void main(String[] args) {
		int n = 5, m = 2;
		StringBuilder tip = new StringBuilder();
		tip.append("Combine(");
		tip.append(String.valueOf(n)).append(",").append(String.valueOf(m));
		tip.append("):");
		tip.append(new Combine(n, m).getCombine());
		System.out.println(tip.toString());
	}

	static class Combine {
		private int m;
		private int n;

		public Combine(int m, int n) {
			this.m = m;
			this.n = n;
			
		}

		public int getCombine() {

			n = Math.max(n, m - n);
			return Util.getFactorial(m) / (Util.getFactorial(m - n) * Util.getFactorial(n));
		}
	}

	static class Util {
		public static int getFactorial(int n) {
			if (n < 0) {
				System.exit(1);
			}
			if (n == 0) {
				return 1;
			} else {
				return n * getFactorial(n - 1);
			}
		}
	}

	static class MyException extends Exception {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

	}
}

