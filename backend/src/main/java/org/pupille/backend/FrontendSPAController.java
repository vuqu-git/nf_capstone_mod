package org.pupille.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendSPAController {

    @GetMapping(value = {
            "/",
            "/{path:^(?!api|static|assets).*}/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}