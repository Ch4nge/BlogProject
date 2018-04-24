package fi.tamk.tiko.macaroni.blog;

import java.util.List;

public class BlogPostRequestWrapper {

    public List<BlogTag> tags;
    BlogPost post;


    public BlogPostRequestWrapper() {
    }

    public BlogPostRequestWrapper(List<BlogTag> tags, BlogPost post) {
        this.tags = tags;
        this.post = post;
    }

    public List<BlogTag> getTags() {
        return tags;
    }

    public void setTags(List<BlogTag> tags) {
        this.tags = tags;
    }

    public BlogPost getPost() {
        return post;
    }

    public void setPost(BlogPost post) {
        this.post = post;
    }
}
