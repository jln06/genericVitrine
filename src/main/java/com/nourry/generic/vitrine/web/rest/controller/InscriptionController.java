package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.domain.PieceJointe;
import com.nourry.generic.vitrine.service.IInscriptionService;
import com.nourry.generic.vitrine.service.IPieceJointeService;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.SaisonDto;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/public")
public class InscriptionController {

    private final Logger logger = LoggerFactory.getLogger(InscriptionController.class);

    @Autowired
    private IInscriptionService inscriptionService;

    @Autowired
    private IPieceJointeService pieceJointeService;

    @PostMapping("/inscription")
    @ResponseStatus(HttpStatus.OK)
    public void inscrire(
        @Valid @RequestPart("inscription") InscriptionDto inscriptionDto,
        @RequestParam("assurance") MultipartFile assurance,
        @RequestParam("certificatMedical") MultipartFile certificatMedical
    ) {
        this.inscriptionService.inscrire(inscriptionDto, assurance, certificatMedical);
    }

    @GetMapping("/inscription/{saison}")
    @ResponseStatus(HttpStatus.OK)
    public List<InscriptionDto> recupererInscriptions(@PathVariable String saison) {
        return this.inscriptionService.recupererInscriptions(saison);
    }

    @GetMapping("/saison")
    @ResponseStatus(HttpStatus.OK)
    public List<SaisonDto> recupererSaisons() {
        return this.inscriptionService.recupererSaisons();
    }

    /**
     * permet de declarer une inscritpion payée
     */
    @PatchMapping("/inscription/paye/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void payerInscription(@PathVariable(value = "id") Long idInscription) {
        this.inscriptionService.payerInscription(idInscription);
    }

    @GetMapping("/inscription/excel/{saison}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<byte[]> downloadExcel(@PathVariable String saison) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "nom_de_votre_fichier.xlsx");
        return ResponseEntity.ok().headers(headers).body(inscriptionService.creerExcelSaison(saison));
    }

    @GetMapping("/inscription/download/piece-jointe/{id}")
    @Operation(
        summary = "Télécharge un fichier associé à un import à partir de son Id et son type",
        tags = { "InscriptionController-manager" }
    )
    public ResponseEntity<byte[]> downloadFichier(@PathVariable(value = "id") Long idPieceJointe) {
        PieceJointe fileImportByType = pieceJointeService.getPieceJointeById(idPieceJointe);
        byte[] image = fileImportByType.getFichier().getImage();
        MediaType mimeType = MediaType.valueOf(fileImportByType.getFormat());
        HttpHeaders respHeaders = new HttpHeaders();
        respHeaders.setContentLength(image.length);
        respHeaders.setContentType(mimeType);
        respHeaders.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        respHeaders.set(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=" + fileImportByType.getNom().concat(".").concat(mimeType.getSubtype())
        );
        return ResponseEntity.ok().headers(respHeaders).body(image);
    }
}
