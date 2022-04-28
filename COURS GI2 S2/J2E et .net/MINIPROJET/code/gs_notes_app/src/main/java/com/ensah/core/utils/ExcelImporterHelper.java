package com.ensah.core.utils;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;

@MultipartConfig
public class ExcelImporterHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public  static boolean hasExcelFormat(MultipartFile file){
        if(TYPE.equals(file.getContentType())){
            return  true;
        }
        return  false;
    }
}
