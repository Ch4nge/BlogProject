package fi.tamk.tiko.macaroni.blog;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "blogs")
public class BlogPost {
    @Id @GeneratedValue
    private long id;

    private String title;

    private String description;

    @Column(name = "DATETIME_FIELD", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp dateTimeField;


    @Column(columnDefinition="clob")
    @Lob
    private String content;

    public BlogPost(String title, String content, String description) {
        this.title = title;
        this.content = content;
        this.description = description;
    }

    public BlogPost() {

    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getDateTimeField() {
        return dateTimeField;
    }

    public void setDateTimeField(Timestamp dateTimeField) {
        this.dateTimeField = dateTimeField;
    }
}
