package org.pupille.backend.perplexityai.model;

import java.util.List;

/**
 * {
 *      "model": "gpt-4o-mini",
 *      "messages": [{"role": "user", "content": "Was ist eine Primzahl?"}],
 *      "temperature": 0.7
 *    }
 */
public record OpenAIRequest(String model, List<OpenAIRequestMessage> messages, double temperature) {

    public OpenAIRequest(String model, String messageContent , double temperature) {
        this(   model,
                List.of( new OpenAIRequestMessage("user", messageContent) ),
                temperature);
    }

}