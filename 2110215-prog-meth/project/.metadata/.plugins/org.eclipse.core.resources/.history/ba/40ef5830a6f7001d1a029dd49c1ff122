package utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class TextFileUtil {

	public static String[] ReadTextFile(String filePath) {

        try {
            InputStream inputStream = ClassLoader.getSystemResourceAsStream(filePath);
            if (inputStream == null) {
                System.out.println("File not found: " + filePath);
                return null;
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            List<String> lines = new ArrayList<String>();
            
            
            String line;
            while ((line = reader.readLine()) != null) {
            	lines.add(line.replace("\n", "").replace("\r", ""));
            }
            reader.close();

            String[] data = new String[lines.size()];

            for (int i = 0; i < lines.size(); i++) {
                data[i] = lines.get(i);
            }

            return data;
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
    }
}


