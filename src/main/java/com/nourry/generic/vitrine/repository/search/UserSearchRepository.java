package com.nourry.generic.vitrine.repository.search;

import com.nourry.generic.vitrine.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data Elasticsearch repository for the User entity.
 */
public interface UserSearchRepository extends JpaRepository<User, Long> {}
//interface UserSearchRepositoryInternal {
//    Stream<User> search(String query);
//}
//class UserSearchRepositoryInternalImpl implements UserSearchRepositoryInternal {
//
//    private final ElasticsearchRestTemplate elasticsearchTemplate;
//
//    UserSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
//        this.elasticsearchTemplate = elasticsearchTemplate;
//    }
//
//    @Override
//    public Stream<User> search(String query) {
//        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
//        return elasticsearchTemplate.search(nativeSearchQuery, User.class).map(SearchHit::getContent).stream();
//    }
//}
