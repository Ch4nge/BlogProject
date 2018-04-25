package fi.tamk.tiko.macaroni.blog;

public class LoginAttempt {

    private String username;
    private String password;

    public LoginAttempt(){

    }

    public LoginAttempt(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
