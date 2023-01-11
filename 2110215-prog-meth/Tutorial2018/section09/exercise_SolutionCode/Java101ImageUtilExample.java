import java.util.Scanner;
public class Java101ImageUtilExample{
	public static void main(String [] args){
		int [][][] rgb1 = Java101ImageUtil.getRGBArrayFromFile();
		if(rgb1==null){
			return;
		}
		int [][][] rgb2 = flipVertical(rgb1);
		int [][][] rgb3 = genAllRed(64,128);
		char choice = getUserChoice(genChoiceMenu());
		String title;
		switch(choice){
			case '1':
				title = "One image";
				Java101ImageUtil.showViewer(rgb1,title);
				break;
			case '2':
				title = "One image and its flipped version";
				Java101ImageUtil.showViewer(rgb1,rgb2,title);
				break;
			case '3':
				title = "One image, its flipped version, and a 64x128 all red";
				int [][][][] rgbs = new int[3][][][];
				rgbs[0] = rgb1;
				rgbs[1] = rgb2;
				rgbs[2] = rgb3;
				Java101ImageUtil.showViewer(rgbs,title);
				break;
			default:
				System.out.println("Bad choice. Bye bye");
		}
	}
	public static int [][][] flipVertical(int [][][] rgb){
		int w = rgb.length;
		int h = rgb[0].length;
		int [][][] newRgb = new int[w][h][3];
		for(int i=0;i<w;i++){
			for(int j=0;j<h;j++){
				for(int channel=0;channel<3;channel++){
					newRgb[i][j][channel] = rgb[i][(h-1)-j][channel];
				}
			}
		}
		return newRgb;
	}
	public static int [][][] genAllRed(int w,int h){
		int [][][] rgb = new int[w][h][3];
		for(int i=0;i<w;i++){
			for(int j=0;j<h;j++){
				rgb[i][j][0] = 255;
			}
		}
		return rgb;
	}
	private static String genChoiceMenu(){
		String menu = "";
		menu = menu.concat("Pick how to show the images\n");
		menu = menu.concat("------------------------------------------------------------\n");
		menu = menu.concat("1 : Show only the loaded file\n");
		menu = menu.concat("2 : Show the loaded file + its flipped version\n");
		menu = menu.concat("3 : Show both + a red patch\n");
		menu = menu.concat("------------------------------------------------------------\n");
		menu = menu.concat(">>");
		return menu;
	}
	private static char getUserChoice(String menu){
		System.out.print(menu);
		Scanner kb = new Scanner(System.in);
		return kb.next().charAt(0);
	}
}