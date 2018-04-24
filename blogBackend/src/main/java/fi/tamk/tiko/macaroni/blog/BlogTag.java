package fi.tamk.tiko.macaroni.blog;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="tag")
public class BlogTag {

    @Id @GeneratedValue
    private long id;

    @NotNull
    private String title;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.MERGE
            },
            mappedBy = "tags")
    private Set<BlogPost> blogPosts = new HashSet<>();

    public BlogTag(String title) {
        this.title = title;
    }

    public BlogTag() {

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
}