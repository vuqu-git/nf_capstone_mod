package org.pupille.backend.perplexityai.controller;

import lombok.RequiredArgsConstructor;
import org.pupille.backend.perplexityai.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/perplexityai")
@RequiredArgsConstructor
public class PerplexityAIController {

    private final OpenAIService aiService;


    @PostMapping()
    String emojiText(@RequestBody(required = true) String text) {

        String prompt = "We are a cinema and we want to spice up our social postings. " +
                        "Add suitable, creative emojis to the following text, don't change the text (though correcting spelling errors is allowed) " +
                        "and respond only with the text incl. the emojis:";
        String response = aiService.generateAIAnswerWhenPrompting(prompt + text);

        return response;
    }

}
