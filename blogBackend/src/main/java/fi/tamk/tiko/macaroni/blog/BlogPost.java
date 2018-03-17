package fi.tamk.tiko.macaroni.blog;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "blogs")
public class BlogPost {
    @Id @GeneratedValue
    private long id;

    private String title;

    private String content;

    public BlogPost(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public BlogPost() {

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



}
