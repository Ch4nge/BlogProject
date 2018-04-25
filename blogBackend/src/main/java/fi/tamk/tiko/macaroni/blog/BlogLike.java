package fi.tamk.tiko.macaroni.blog;

import javax.persistence.Id;

import javax.persistence.*;

/**
 * Created by possumunnki on 14.4.2018.
 */
@Entity
@Table(name = "likes",uniqueConstraints={@UniqueConstraint(columnNames = {"COMMENT_ID" , "memberId"})})
public class BlogLike {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="COMMENT_ID")
    private BlogComment blogComment;


    public BlogLike() {
    }

    public BlogLike(BlogComment comment) {
        this.blogComment = comment;
    }

    public BlogLike(BlogComment comment, long memberId) {
        this.blogComment = comment;
        this.memberId = memberId;
    }

    public long getMemberId() {
        return memberId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setBlogComment(BlogComment blogComment) {
        this.blogComment = blogComment;

    }

    public BlogComment getBlogComment() {
        return blogComment;
    }
}
