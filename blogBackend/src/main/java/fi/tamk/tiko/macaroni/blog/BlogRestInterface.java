package fi.tamk.tiko.macaroni.blog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Optional;

@RestController
public class BlogRestInterface {


    @Autowired
    BlogPostRepository postRepository;

    @CrossOrigin
    @RequestMapping(value = "/blogs", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(@RequestBody BlogPost bPost, UriComponentsBuilder builder){
        postRepository.save(bPost);

        UriComponents uriComponents =
                builder.path("blogs/{id}").buildAndExpand(bPost.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogs(){
        return postRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}", method = RequestMethod.GET)
    public BlogPost getBlogPost(@PathVariable long blogID){
        BlogPost bPost = postRepository.findById(blogID).orElse(null);
        return bPost;
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}", method = RequestMethod.DELETE)
    public void deleteBlogPost(@PathVariable long blogID){
        postRepository.deleteById(blogID);
    }



}
