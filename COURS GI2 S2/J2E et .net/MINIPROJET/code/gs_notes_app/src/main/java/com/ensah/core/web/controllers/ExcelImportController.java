package com.ensah.core.web.controllers;

import com.ensah.core.utils.ExcelImporterHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;

@Controller
@MultipartConfig
public class ExcelImportController {


    @GetMapping("/admin/uploadexcel")

    public  String doGet(){

        return "admin/inscription";
    }
    @PostMapping("/upload/excel")

    public  void uploadexcelfile(@RequestParam("file")MultipartFile file){

       try{
           if(ExcelImporterHelper.hasExcelFormat(file)){
               System.out.println("Fichier excell");
           }
           else {
               System.out.println("NOm");
           }
       }catch (Exception e){
           System.out.println(e.getMessage());
       }

    }
}
