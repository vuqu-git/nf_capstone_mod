package org.pupille.backend.perplexityai.model;

/**
 * {
 *      "role": "user",
 *      "content": "Was ist eine Primzahl?"
 * }
 */

public record OpenAIRequestMessage(
        String role,
        String content) {
}
