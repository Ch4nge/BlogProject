package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by possumunnki on 14.4.2018.
 */

public interface BlogLikeRepository extends CrudRepository<BlogLike, Long> {
    public Iterable<BlogLike> findByBlogComment(BlogComment blogComment);
    public List<BlogLike> removeBlogLikeByBlogComment(BlogComment blogComment);
}
