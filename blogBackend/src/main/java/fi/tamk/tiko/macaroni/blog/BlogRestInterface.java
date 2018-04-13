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

    @Autowired
    BlogCommentRepository commentRepository;

    @Autowired
    MemberRepository memberRepository;

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

    //COMMENTS

    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}/comments", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogComment(
            @RequestBody BlogComment blogComment,
            UriComponentsBuilder builder,
            @PathVariable long blogID
            ){
        blogComment.setBlogpostid(blogID);
        commentRepository.save(blogComment);

        UriComponents uriComponents =
                builder.path("blogs/{blogID}/comments").buildAndExpand(blogComment.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }


    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}/comments", method = RequestMethod.GET)
    public Iterable<BlogComment> getBlogComments(@PathVariable long blogID){
        return commentRepository.findByBlogpostid(blogID);
    }

    /*@CrossOrigin
    @RequestMapping(value = "/blogs/blogID/comments/{commentID}", method = RequestMethod.DELETE)
    public void deleteBlogComment(@PathVariable long commentID){
        postRepository.deleteById(commentID);
    }*/


    //USERS
    @CrossOrigin
    @RequestMapping(value = "/users")
    public Iterable<Member> getMembers(){
        return memberRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/users", method= RequestMethod.POST)
    public ResponseEntity<Void> addMember(@RequestBody Member member, UriComponentsBuilder builder){
        memberRepository.save(member);

        UriComponents uriComponents =
                builder.path("blogs/{id}").buildAndExpand(member.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "/users/{memberID}", method = RequestMethod.GET)
    public Member getMember(@PathVariable long memberID){
        Member member = memberRepository.findById(memberID).orElse(null);
        return member;
    }

    @CrossOrigin
    @RequestMapping(value = "/users/{memberID}", method = RequestMethod.DELETE)
    public void deleteMember(@PathVariable long memberID){
        memberRepository.deleteById(memberID);
    }
}
