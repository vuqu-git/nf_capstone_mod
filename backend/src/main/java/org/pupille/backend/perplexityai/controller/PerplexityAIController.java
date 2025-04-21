package org.pupille.backend.perplexityai.controller;

import lombok.RequiredArgsConstructor;
import org.pupille.backend.perplexityai.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/perplexityai")
@RequiredArgsConstructor
public class PerplexityAIController {

    private final OpenAIService aiService;


    @PostMapping("/emojify")
    public String emojiText(@RequestBody(required = true) String text) {

        String prompt = "We are a cinema and we want to spice up our social postings. " +
                        "Add suitable, creative emojis to the following text, don't change the text (though correcting spelling errors is allowed) " +
                        "and respond only with the text incl. the emojis:";
        String response = aiService.generateAIAnswerWhenPrompting(prompt + text);

        return response;
    }

    @PostMapping("/film-text")
    public String createFilmText(
                    @RequestParam("titel") String title,
                    @RequestParam("originalTitel") String originalTitle,
                    @RequestParam("jahr") String year) {

        String prompt = "We are a cinema and we want a description text for a film in German! " +
                "The text should consist of max 750 chars (with spaces), does not contain major spoilers, describe the plot (in medias res style). Write also 1 sentence why the film is worth watching. " +
                "Avoid simple sentences like 'The [title]...' or 'The film...' when praising the film. Do it eloqent. " +
                "Use quotes instead of *! and don't insert citation numbers" +
                "The film is: " + title;

        if (!originalTitle.isEmpty() && !year.isEmpty()) {
            prompt = prompt + "(" + originalTitle + ") from year " + year;
        } else if (!originalTitle.isEmpty()) {
            prompt = prompt + "(" + originalTitle + ")";
        } else if (!year.isEmpty()) {
            prompt = prompt + " from year " + year;
        }

        return aiService.generateAIAnswerWhenPrompting(prompt);
    }
}
