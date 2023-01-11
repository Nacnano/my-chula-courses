import javax.swing.*;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.awt.Color;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
public class Java101ImageUtil{
	public static int [][][] getRGBArrayFromFile(){
		JFileChooser chooser = new JFileChooser();
	    FileNameExtensionFilter filter = new FileNameExtensionFilter(
        "JPG & GIF Images", "jpg", "gif");
	    chooser.setFileFilter(filter);
	    int returnVal = chooser.showOpenDialog(null);
	    if(returnVal == JFileChooser.APPROVE_OPTION) {
	       	return getRGBArrayOfSelectedFile(chooser.getSelectedFile());
	    }else{
	    	return null;
	    }
	}
	public static int [][][] getRGBArrayOfSelectedFile(File file){
		BufferedImage img = null;
		try {
		    img = ImageIO.read(file);
		} catch (IOException e) {
			System.out.println("Cannot read the selected file.");
			System.exit(1);
		}
		int h = img.getHeight();
		int w = img.getWidth();
		int[][][] rgb = new int[w][h][3];
		for( int i = 0; i < w; i++ ){
		    for( int j = 0; j < h; j++ ){
		    	Color c = new Color(img.getRGB(i,j));
		        rgb[i][j][0] = c.getRed();
		        rgb[i][j][1] = c.getGreen();
		        rgb[i][j][2] = c.getBlue();
			}
		}
		return rgb;
	}
	public static void showViewer(int [][][] rgb,String title){
		Java101Viewer frame = new Java101Viewer(rgb,title);
		initViewer(frame);
	}
	public static void showViewer(int [][][] rgb1,int [][][] rgb2,String title){
		Java101Viewer frame = new Java101Viewer(rgb1,rgb2,title);
		initViewer(frame);
	}
	public static void showViewer(int [][][][] rgbs,String title){
		Java101Viewer frame = new Java101Viewer(rgbs,title);
		initViewer(frame);
	}
	private static void initViewer(Java101Viewer frame){
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
       	frame.pack();
        frame.setVisible(true);
        System.out.println("Close the image viewer to exit the program.");
	}
}

class Java101Viewer extends JFrame{
	public Java101Viewer(int [][][] rgb,String title){
		super(title);
		setLayout(new GridLayout(1,1));
		Java101DrawingPanel drawing = new Java101DrawingPanel(rgb);
		add(drawing);
	}  
	public Java101Viewer(int [][][] rgb1,int [][][] rgb2,String title){
		super(title);
		setLayout(new GridLayout(1,2));
		Java101DrawingPanel drawingLeft = new Java101DrawingPanel(rgb1);
		add(drawingLeft);
		Java101DrawingPanel drawingRight = new Java101DrawingPanel(rgb2);
		add(drawingRight);
	}
	public Java101Viewer(int [][][][] rgbs,String title){
		super(title);
		int num = rgbs.length;
		Java101DrawingPanel [] drawings = new Java101DrawingPanel[num];
		setLayout(new GridLayout(1,num));
		for(int i=0;i<num;i++){
			drawings[i] = new Java101DrawingPanel(rgbs[i]);
			add(drawings[i]);
		}
	}
}

class Java101DrawingPanel extends JPanel{
	BufferedImage bi;
	public Java101DrawingPanel(int [][][] rgb){
		int w = rgb.length;
		int h = rgb[0].length;
		bi = new BufferedImage(w,h,BufferedImage.TYPE_INT_ARGB);
		setPreferredSize(new Dimension(w,h));
		System.out.println("Image size=("+w+","+h+")");
		paintImage(rgb);
	}
	public void paintComponent(Graphics g){
		super.paintComponent(g);
		g.drawImage(bi,0,0,null);
	}
	private void paintImage(int [][][] rgb){
		for(int x=0;x<rgb.length;x++){
			for(int y=0;y<rgb[x].length;y++){
				Color c = new Color(rgb[x][y][0],rgb[x][y][1],rgb[x][y][2]);
				int rgbInt = c.getRGB();
				bi.setRGB(x,y,rgbInt);
			}
		}
	}
}