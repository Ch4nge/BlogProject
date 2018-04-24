package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

public interface BlogPostRepository extends CrudRepository<BlogPost, Long> {
    public Iterable<BlogPost> findBlogPostsByTagsIn(BlogTag tag);
}
