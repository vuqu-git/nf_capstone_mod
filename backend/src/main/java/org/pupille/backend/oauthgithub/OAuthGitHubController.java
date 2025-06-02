package org.pupille.backend.oauthgithub;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/oauthgithub")
public class OAuthGitHubController {
    @GetMapping("/me")
    public String getMe(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            return "anonymousUser";
        }
        return oAuth2User.getAttribute("login");
    }
}
