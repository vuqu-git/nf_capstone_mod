package org.pupille.backend.perplexityai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import org.pupille.backend.perplexityai.model.OpenAIRequest;
import org.pupille.backend.perplexityai.model.OpenAIResponse;


@Service
public class OpenAIService {

    private final RestClient restClient;

    public OpenAIService(@Value("${PERPLEXITY_API_KEY}") String key, RestClient.Builder restClient) {
        this.restClient = restClient
                .baseUrl("https://api.perplexity.ai/chat/completions")
                .defaultHeader("Authorization", "Bearer " + key)
                .build();
    }

    public String generateAIAnswerWhenPrompting(String input) {
        OpenAIResponse response = restClient.post()
                .body(new OpenAIRequest(
                        "sonar",
                        input,
                        0.9))
                .retrieve()
                .body(OpenAIResponse.class);

//        return response.choices().get(0).message().content();
        return getContentFromOpenAIResponse(response);
    }

    public String getContentFromOpenAIResponse(OpenAIResponse oaiResponse) {
        return oaiResponse.choices().get(0).message().content();
    }

}