package fi.tamk.tiko.macaroni.blog;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by possumunnki on 2.4.2018.
 */
@Entity
@Table(name = "comments")
public class BlogComment {
    @Id @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;
    private long blogpostid;
    private String userName;

    @Column(name = "DATETIME_FIELD", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp dateTimeField;

    @Column(columnDefinition="clob")
    @Lob
    private String content;

    public BlogComment() {
    }


    public BlogComment(long blogpostid, String userName, Timestamp dateTimeField, String content) {
        this.blogpostid = blogpostid;
        this.userName = userName;
        this.dateTimeField = dateTimeField;
        this.content = content;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Timestamp getDateTimeField() {
        return dateTimeField;
    }

    public void setDateTimeField(Timestamp dateTimeField) {
        this.dateTimeField = dateTimeField;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getBlogpostid() {
        return blogpostid;
    }

    public void setBlogpostid(long blogpostid) {
        this.blogpostid = blogpostid;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
