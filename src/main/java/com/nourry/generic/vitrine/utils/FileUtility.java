package com.nourry.generic.vitrine.utils;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

public class FileUtility {

    private static final String DATE_PATTERN_YYYYMMDD = "yyyyMMdd";
    private static final String DATE_PATTERN_YYYYMMDDHHMMSS = "yyyyMMddHHmmss";

    private FileUtility() {}

    public static String getFileExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return getFileExtension(fileName);
    }

    public static String getFileExtension(String fileName) {
        if (fileName != null && fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) return fileName.substring(
            fileName.lastIndexOf(".") + 1
        ); else return "";
    }

    public static MediaType getMimeTypeFromName(String name) {
        String ext = name.substring(name.lastIndexOf(".") + 1);
        if (ext.equalsIgnoreCase("PDF")) return MediaType.APPLICATION_PDF;
        if (ext.equalsIgnoreCase("GIF")) return MediaType.IMAGE_GIF;
        if (ext.equalsIgnoreCase("TXT")) return MediaType.TEXT_PLAIN;
        if (ext.equalsIgnoreCase("JPEG") || ext.equalsIgnoreCase("JPG")) return MediaType.IMAGE_JPEG;
        if (ext.equalsIgnoreCase("XLSX")) return MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        if (ext.equalsIgnoreCase("CSV")) return MediaType.valueOf("text/csv");
        if (ext.equalsIgnoreCase("PNG")) return MediaType.IMAGE_PNG;
        return null;
    }
}
