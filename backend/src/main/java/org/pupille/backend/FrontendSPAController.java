package org.pupille.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendSPAController {

    @RequestMapping(value = {
            "/{path:[^\\.]*}",           // Matches paths without file extensions
            "/{path:^(?!api).*}/**"      // Matches any path that doesn't start with 'api'
    })
    public String forward() {
        return "forward:/index.html";
    }
}