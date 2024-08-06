package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.PieceJointe;
import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.enums.PieceJointeTypeEnum;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Saison} entity.
 */
@Repository
public interface PieceJointeRepository extends JpaRepository<PieceJointe, Long> {
    @Query("SELECT p.id FROM PieceJointe p WHERE p.typePieceJointe.code = ?1 AND p.inscription.id = ?2")
    Optional<Long> findByTypeAndInscriptionId(PieceJointeTypeEnum pieceJointeTypeEnum, Long idInscription);
}
