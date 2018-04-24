package fi.tamk.tiko.macaroni.blog;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"post_id" , "user_id"})})
public class Like {

    @Id @GeneratedValue
    private long id;

    private long post_id;

    private long user_id;

    public Like() {
    }

    public Like(long post_id, long user_id) {
        this.post_id = post_id;
        this.user_id = user_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPost_id() {
        return post_id;
    }

    public void setPost_id(long post_id) {
        this.post_id = post_id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
}
