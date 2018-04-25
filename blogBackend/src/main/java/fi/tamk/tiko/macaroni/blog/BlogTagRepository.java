package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

public interface BlogTagRepository extends CrudRepository<BlogTag, Long> {
    public BlogTag findBlogTagByTitle(String title);
}
