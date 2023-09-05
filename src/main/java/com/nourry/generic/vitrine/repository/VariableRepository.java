package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.domain.VariableComponent;
import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import java.util.Optional;
import org.aspectj.weaver.ast.Var;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Saison} entity.
 */
@Repository
public interface VariableRepository extends JpaRepository<VariableComponent, Long> {
    Optional<VariableComponent> findByCode(VariableComponentEnum variableComponentEnum);
}
