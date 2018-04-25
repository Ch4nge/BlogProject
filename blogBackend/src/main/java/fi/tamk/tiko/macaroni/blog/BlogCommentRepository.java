package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by possumunnki on 2.4.2018.
 */
public interface BlogCommentRepository extends CrudRepository<BlogComment, Long> {
    public Iterable<BlogComment> findByBlogpostid(long blogpostid);
}
