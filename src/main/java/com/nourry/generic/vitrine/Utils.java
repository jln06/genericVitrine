package com.nourry.generic.vitrine;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class Utils {

    public static String localDateToString(LocalDate localDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return localDate.format(formatter);
    }

    public static String localDateTimeToString(LocalDateTime localDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH:mm");
        return localDateTime.format(formatter);
    }

    public static LocalDateTime instantToLocalDate(Instant instant) {
        ZoneId zoneId = ZoneId.of("Europe/Paris");
        return instant.atZone(zoneId).toLocalDateTime();
    }
}
