package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.service.IInscriptionService;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.SaisonDto;
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

@RestController
@RequestMapping("/api/public")
public class InscriptionController {

    private final Logger logger = LoggerFactory.getLogger(InscriptionController.class);

    @Autowired
    private IInscriptionService inscriptionService;

    @PostMapping("/inscription")
    @ResponseStatus(HttpStatus.OK)
    public void inscrire(@Valid @RequestBody InscriptionDto inscriptionDto) {
        this.inscriptionService.inscrire(inscriptionDto);
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
}
