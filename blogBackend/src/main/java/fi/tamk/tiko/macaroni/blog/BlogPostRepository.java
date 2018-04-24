package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {
    public Iterable<BlogPost> findByTagsIn(Set<BlogTag> tag);
}
