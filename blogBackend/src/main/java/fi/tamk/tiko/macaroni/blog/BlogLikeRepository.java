package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by possumunnki on 14.4.2018.
 */

public interface BlogLikeRepository extends CrudRepository<BlogLike, Long> {
    public Iterable<BlogLike> findByBlogComment(BlogComment blogComment);
    //KORJAAA
    public void deleteByBlogCommentAndMemberId(BlogComment blogComment, long memberId);
}
