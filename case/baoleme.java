
import java.util.Scanner;
public class Main {
  /*
  * 根据我多年的吃蛋炒饭经验编写的一个做蛋炒饭外卖的模拟
  * if you made a terrible cooking follow this,you could have a JAVA coffee instead.
  * */
    public static void main(String[] args) {
        Scanner myIn = new Scanner(System.in);
        String name = myIn.nextLine();
        myIn.close();
        System.out.println("+++++++++++++++++++++++++++++");
        System.out.println("++.........................++");
        System.out.println("++.........饱了么外卖.......++");
        System.out.println("++.........................++");
        System.out.println("+++++++++++++++++++++++++++++");
        System.out.println("尊敬的顾客" + name + "您好,您的蛋炒饭已接单。");
        System.out.println("我们是开放式厨房，您将看到厨房中的一切");
        System.out.println("--------------------");
        /*把油烧开
        * 要{烧开油}得先{倒油}
        *   要{倒油}得先{拿油}
        *   要{倒油}得先{拿锅}
        * 要{烧开油}得先{点火}
        * */
        ShaoKaiYou();
        /*把鸡蛋炒熟
        * 要{炒鸡蛋}得先{放鸡蛋}
        *   要{放鸡蛋}得先{打鸡蛋}
        *       要{打鸡蛋}得先{拿鸡蛋}
        *       要{打鸡蛋}得先{拿碗}
        *       要{打鸡蛋}得先{拿筷子}
        *   要{放鸡蛋}得先{放葱花}
        *       要{放葱花}得先{切葱}
        *           要{切葱}得先{拿葱}
        *           要{切葱}得先{拿菜刀}
        *           要{切葱}得先{拿案板}
        * 要{炒鸡蛋}得先{拿炒勺}
        *
        * */
        ChaoJiDan();
        /*把饭炒熟
        * 要{炒饭}得先{放饭}
        *   要{放饭}得先{拿饭}
        *   要{拿饭}得先{打开冰箱}
        *   {打开冰箱}完了要{关闭冰箱}
        *
        * */
        ChengFan();
        /*放碗里
        * 要{放碗里}得先拿碗
        * */
        System.out.println("--------------------");
        System.out.println("尊敬的顾客" + name + ",您的蛋炒饭已在配送。");
    }

    /**/
    private static void ShaoKaiYou() {
        DaoYou();
        DianHuo();
        Cmd.ShaoKaiYou.sayDone();
    }

    private static void DaoYou() {
        NaYou();
        NaGuo();
        Cmd.DaoYou.sayDone();
    }

    private static void NaYou() {
        Cmd.NaYou.sayDone();
    }

    private static void NaGuo() {
        Cmd.NaGuo.sayDone();
    }

    private static void DianHuo() {
        Cmd.DianHuo.sayDone();
    }

    /**/
    private static void ChaoJiDan() {
        FangJiDan();
        NaChaoShao();
        Cmd.ChaoJiDan.sayDone();
    }

    private static void DaJiDan() {
        NaJiDan();
        NaWan();
        NaKuaiZi();
        Cmd.DaJiDan.sayDone();
    }

    private static void NaJiDan() {
        Cmd.NaJiDan.sayDone();
    }

    private static void NaKuaiZi() {
        Cmd.NaKuaiZi.sayDone();
    }

    private static void FangCongHua() {
        QieCong();
        Cmd.FangCongHua.sayDone();
    }

    private static void QieCong() {
        NaCong();
        NaCaiDao();
        NaAnBan();
        Cmd.QieCong.sayDone();
    }

    private static void NaCong() {
        Cmd.NaCong.sayDone();
    }

    private static void NaCaiDao() {
        Cmd.NaCaiDao.sayDone();
    }

    private static void NaAnBan() {
        Cmd.NaAnBan.sayDone();
    }

    private static void NaChaoShao() {
        Cmd.NaChaoShao.sayDone();
    }

    private static void FangJiDan() {
        DaJiDan();
        FangCongHua();
        Cmd.FangJiDan.sayDone();
    }

    /**/
    private static void ChaoFan() {
        FangFan();
        Cmd.ChaoFan.sayDone();
    }

    private static void FangFan() {
        NaFan();
        Cmd.FangFan.sayDone();
    }

    private static void NaFan() {
        DaKaiBingXiang();
        GuanBiBingXiang();
        Cmd.NaFan.sayDone();
    }

    private static void DaKaiBingXiang() {
        Cmd.DaKaiBingXiang.sayDone();
    }

    private static void GuanBiBingXiang() {
        Cmd.GuanBiBingXiang.sayDone();
    }

    private static void ChengFan() {
        NaWan();
        Cmd.ChengFan.sayDone();
    }

    private static void NaWan() {
        Cmd.NaWan.sayDone();
    }

}

enum Cmd {
    ShaoKaiYou("烧开油"),
    DaoYou("倒油"),
    NaYou("拿油"),
    NaGuo("拿锅"),
    DianHuo("点火"),
    ChaoJiDan("炒鸡蛋"),
    DaJiDan("打鸡蛋"),
    NaJiDan("拿鸡蛋"),
    NaWan("拿碗"),
    NaKuaiZi("拿筷子"),
    FangCongHua("放葱花"),
    QieCong("切葱"),
    NaCong("拿葱"),
    NaCaiDao("拿菜刀"),
    NaAnBan("拿案板"),
    NaChaoShao("拿炒勺"),
    FangJiDan("放鸡蛋"),
    ChaoFan("炒饭"),
    NaFan("拿饭"),
    DaKaiBingXiang("打开冰箱"),
    GuanBiBingXiang("关闭冰箱"),
    FangFan("放饭"),
    ChengFan("盛饭");


    private String name;

    Cmd(String name) {
        this.name = name;
    }

    public void sayDone() {
        System.out.println("后厨正在" + this.name);
    }
}
