package fi.tamk.tiko.macaroni.blog;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

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

    //BLOG COMMENT LIKE
    @CrossOrigin
    @RequestMapping(value = "comments/{blogCommentID}/like", method= RequestMethod.POST)
    public ResponseEntity<Void> addBlogCommentLike(
            UriComponentsBuilder builder,
            @PathVariable long blogCommentID){

        BlogLike blogLike = new BlogLike(commentRepository.findById(blogCommentID).orElse(null));

        likeRepository.save(blogLike);

        UriComponents uriComponents =
                builder.path("comments/{blogCommentID}/like").buildAndExpand(blogCommentID);
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
    @RequestMapping(value = "/blogs/comments/{likeID}", method = RequestMethod.DELETE)
    public void deleteBlogLike(@PathVariable long likeID){
        likeRepository.deleteById(likeID);
        //korjaappa viä!!!!!!!!!!!
    }


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
}
