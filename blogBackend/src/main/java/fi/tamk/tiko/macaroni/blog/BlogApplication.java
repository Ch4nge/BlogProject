package fi.tamk.tiko.macaroni.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogApplication implements CommandLineRunner{

	@Autowired
	MemberRepository memberRepository;
    @Autowired
    BlogPostRepository blogPostRepository;
	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Member admin = new Member("admin","admin", "admin");
        Member randomMember = new Member("kalle", "kalle", "user");

        memberRepository.save(admin);
	    memberRepository.save(randomMember);

	    String content1 = "Bacon ipsum dolor amet tenderloin ball tip pig kielbasa. Meatball burgdoggen " +
                "sirloin pig turkey ground round. Corned beef pancetta flank, turkey bresaola spare ribs " +
                "rump frankfurter biltong tri-tip. Kevin rump sausage, alcatra meatball pork tongue " +
                "flank tenderloin short ribs pig jowl pancetta prosciutto meatloaf. Chuck turducken t-bone," +
                " ball tip shankle shank filet mignon beef. Filet mignon brisket jerky, ham porchetta meatball" +
                " leberkas shoulder burgdoggen short ribs drumstick ribeye.\n" +
                "\n" +
                "Landjaeger pork loin shoulder turducken, bacon brisket t-bone jerky frankfurter tenderloin picanha." +
                " Fatback burgdoggen buffalo, porchetta venison picanha turducken turkey biltong pork chop andouille" +
                " pork belly tenderloin t-bone. Short loin meatball landjaeger, hamburger venison buffalo pancetta" +
                " brisket porchetta. Tri-tip jerky meatloaf tenderloin, filet mignon bresaola corned beef ribeye." +
                " Turkey cupim tongue short ribs pork chop venison ham hock tenderloin pork loin kevin turducken" +
                " strip steak porchetta picanha.";
	    String content2 = "Chicken shankle cow pork belly. Prosciutto shankle pig ground round corned beef. Short " +
                "loin capicola beef spare ribs chicken frankfurter boudin tenderloin, chuck ham hock pastrami. " +
                "Landjaeger rump pork, ball tip turducken beef ribs boudin pork belly short ribs beef pancetta" +
                " shank pork loin ribeye. Prosciutto flank rump, sirloin meatball shankle biltong turkey pork chop" +
                " frankfurter.";
        BlogPost post1 = new BlogPost("Chop venison", content1,"frankfurter boudin");
	    post1.setImage_url("https://www.w3schools.com/w3images/woods.jpg");
	    BlogPost post2 = new BlogPost("Tshank Filet Mignon", content2,"Pancetta" );
	    post2.setImage_url("https://www.w3schools.com/w3images/bridge.jpg");

	    blogPostRepository.save(post1);
	    blogPostRepository.save(post2);
	}
}
