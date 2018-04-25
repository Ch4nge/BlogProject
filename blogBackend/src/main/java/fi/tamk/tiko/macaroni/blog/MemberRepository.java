package fi.tamk.tiko.macaroni.blog;

import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long> {

    public Member findByUsernameAndPassword(String username, String password);
}
