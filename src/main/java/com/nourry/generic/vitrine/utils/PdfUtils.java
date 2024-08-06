package com.nourry.generic.vitrine.utils;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PdfUtils {

    private static final Logger log = LoggerFactory.getLogger(PdfUtils.class);

    public static byte[] convertToPDFByte(MultipartFile file) throws IOException {
        if (file != null && file.getContentType() != null && !file.getContentType().contains("pdf")) {
            return convertImageToPdf(file);
        }
        return file.getBytes();
    }

    private static byte[] convertImageToPdf(MultipartFile file) {
        Document document = new Document();
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter.getInstance(document, baos);
            document.open();
            document.newPage();
            Image image = Image.getInstance(file.getBytes());
            image.setAbsolutePosition(0, 0);
            image.setBorderWidth(0);
            image.scaleAbsolute(PageSize.A4);
            document.add(image);
            return baos.toByteArray();
        } catch (Exception e) {
            log.debug("Erreur lors de la conversion de l'image en pdf", e);
            throw new RuntimeException("erreur conversion image en pdf :  " + file.getOriginalFilename());
        } finally {
            document.close();
        }
    }
}
