package fi.tamk.tiko.macaroni.blog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.*;

@RestController
public class BlogRestInterface {


    @Autowired
    BlogPostRepository postRepository;

    @Autowired
    BlogCommentRepository commentRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BlogLikeRepository likeRepository;

    @Autowired
    BlogTagRepository tagRepository;

    @CrossOrigin
    @RequestMapping(value = "/blogs", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogPost(
            @RequestBody BlogPostRequestWrapper wrapper, UriComponentsBuilder builder){

        UriComponents uriComponents =
                builder.path("blogs/{id}").buildAndExpand(wrapper.getPost().getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        Member member = memberRepository.findByUsernameAndPassword(wrapper.getUserdata().getUsername(),
                wrapper.getUserdata().getPassword());
        //Only let post, if user is admin
        if(member.getRole().equals("admin")){
            for (BlogTag tag : wrapper.getTags()) {
                if (tagRepository.findBlogTagByTitle(tag.getTitle()) == null) {
                    tagRepository.save(tag);
                }
                wrapper.getPost().getTags().add(tagRepository.findBlogTagByTitle(tag.getTitle()));
            }

            postRepository.save(wrapper.getPost());
        }else{
            return new ResponseEntity<Void>(headers, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogs(){
        return postRepository.findAll();
    }
    @CrossOrigin
    @RequestMapping(value = "/blogs/tags/{tag}", method = RequestMethod.GET)
    public Iterable<BlogPost> getBlogsByTag(@PathVariable String tag){
        BlogTag blogTag = tagRepository.findBlogTagByTitle(tag);
        HashSet<BlogTag> tagList = new HashSet<BlogTag>();
        tagList.add(blogTag);
        return postRepository.findByTagsIn(tagList);
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}", method = RequestMethod.GET)
    public BlogPost getBlogPost(@PathVariable long blogID){
        BlogPost bPost = postRepository.findById(blogID).orElse(null);
        return bPost;
    }

    @CrossOrigin
    @RequestMapping(value = "/blogs/{blogID}", method = RequestMethod.DELETE)
    public void deleteBlogPost(@RequestBody LoginAttempt userdata, @PathVariable long blogID){
        Member member = memberRepository.findByUsernameAndPassword(userdata.getUsername(), userdata.getPassword());

        if(member.getRole().equals("admin")) {
            postRepository.deleteById(blogID);
        }
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

    @CrossOrigin
    @Transactional
    @RequestMapping(value = "/blogs/{blogID}/comments/{commentID}", method = RequestMethod.DELETE)
    public void deleteBlogComment(@RequestBody LoginAttempt userdata,
                                  @PathVariable long blogID,
                                  @PathVariable long commentID
                                  ){

        Member member = memberRepository.findByUsernameAndPassword(userdata.getUsername(), userdata.getPassword());

        if(member.getRole().equals("admin")) {
            BlogComment comment = commentRepository.findById(commentID).orElse(null);
            likeRepository.removeBlogLikeByBlogComment(comment);
            commentRepository.deleteById(commentID);
        }
    }

    //BLOG COMMENT LIKE
    @CrossOrigin
    @RequestMapping(value = "comments/{blogCommentID}/{memberId}/like", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogCommentLike(
            UriComponentsBuilder builder,
            @PathVariable long blogCommentID, @PathVariable long memberId){

        BlogLike blogLike = new BlogLike(commentRepository.findById(blogCommentID).orElse(null), memberId);

        likeRepository.save(blogLike);

        UriComponents uriComponents =
                builder.path("comments/{blogCommentID}/{memberId}/like").buildAndExpand(blogCommentID, memberId);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "comments/{blogCommentID}/like", method = RequestMethod.GET)
    public Iterable<BlogLike> getBlogLikes(@PathVariable long blogCommentID){
        BlogComment blogComment = commentRepository.findById(blogCommentID).orElse(null);
        return likeRepository.findByBlogComment(blogComment);
    }

    @CrossOrigin
    @RequestMapping(value = "/comments/{blogCommentID}/{userID}/like", method = RequestMethod.GET)
    public ResponseEntity<BlogLike> getBlogLike(@PathVariable long blogCommentID,
                                                @PathVariable long userID,
                                                UriComponentsBuilder builder){
        UriComponents uriComponents =
                builder.path("comments/{blogCommentID}/{memberId}/like")
                        .buildAndExpand(blogCommentID, blogCommentID);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        BlogComment blogComment = commentRepository.findById(blogCommentID).orElse(null);

        BlogLike blogLike = likeRepository.findByBlogCommentAndMemberId(blogComment, userID);
        if(blogLike == null){
            return new ResponseEntity<BlogLike>(headers, HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<BlogLike>(blogLike, headers, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/comments/{blogCommentID}/{userID}/like", method = RequestMethod.DELETE)
    public void deleteBlogLike(@PathVariable long blogCommentID, @PathVariable long userID ){
        BlogComment blogComment = commentRepository.findById(blogCommentID).orElse(null);
        BlogLike blogLike = likeRepository.findByBlogCommentAndMemberId(blogComment, userID);
        likeRepository.delete(blogLike);
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

    /*@CrossOrigin
    @RequestMapping(value = "/users/{memberID}", method = RequestMethod.GET)
    public Member getMember(@PathVariable long memberID){
        Member member = memberRepository.findById(memberID).orElse(null);
        return member;
    }*/

    /*@CrossOrigin
    @RequestMapping(value = "/users/{memberID}", method = RequestMethod.DELETE)
    public void deleteMember(@PathVariable long memberID){
        memberRepository.deleteById(memberID);
    }*/

    @CrossOrigin
    @RequestMapping(value = "/users/login", method = RequestMethod.POST)
    public ResponseEntity<Member> login(@RequestBody LoginAttempt loginAttempt, UriComponentsBuilder builder){

        Member member =
                memberRepository.findByUsernameAndPassword(loginAttempt.getUsername(),loginAttempt.getPassword());


        if(member == null){
            return new ResponseEntity<Member>(member, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Member>(member, HttpStatus.OK);
    }
    //TAGS
    @CrossOrigin
    @RequestMapping(value = "/tags", method = RequestMethod.GET)
    public Iterable<BlogTag> getTags(){
        return tagRepository.findAll();
    }
}
