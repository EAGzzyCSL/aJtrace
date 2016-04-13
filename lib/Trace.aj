

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Stack;

/**
 * 函数追踪切面
 *
 * @version 0320
 * @author 张成、赵仲印、张秋鸿、任振川、高恒东
 */
public aspect Trace {
	private static final boolean DEBUG = false;
	private static File trace;;
	private static FileWriter fw;
	{
		Trace.this.getClass().getResource("/");
		trace = new File(Trace.this.getClass().getResource("/").getFile() + "trace.txt");
		try {
			fw = new FileWriter(trace);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	private static int callDepth = 0; // 调用深度
	private static Stack<String> stack = new Stack<>(); // 调用函数栈

	private static void printIndent() {

		for (int i = 0; i < callDepth; i++) {

			try {
				fw.write("   ");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (DEBUG) {
				System.out.print("    ");
			}

		}
	}

	pointcut myClass(): within(Main);

	pointcut myMethod(): myClass() && execution(* *(..));

	before(): myMethod() {

		String name = thisJoinPoint.getSignature().getName();
		if (!stack.empty()) {
			printIndent(); // 首行缩进，打印空格
			callDepth++; // 函数调用深度加1

			try {
				fw.write(stack.peek() + "-----→" + name + "\n");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (DEBUG) {
				System.out.println((stack.peek() + "调用" + name + "\n"));
			}
		}
		stack.add(name); // 将函数名压入栈中
	}

	after() returning(): myMethod() {
		callDepth--; // 调用深度减1
		stack.pop(); // 出栈
	}

	after() : execution(public static void main(..)) {
		try {
			fw.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
