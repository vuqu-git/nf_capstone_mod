package org.pupille.backend.perplexityai.model;

import java.util.List;

/**
 *
 * {
 *
 *     "choices": [
 *         {
 *             "message": {
 *                 "role": "assistant",
 *                 "content": "Eine Primzahl ist eine natürliche Zahl größer als 1, die nur zwei positive Teiler hat: 1 und sich selbst. Das bedeutet, dass eine Primzahl nicht durch eine andere natürliche Zahl ohne Rest teilbar ist, außer durch 1 und die Zahl selbst. \n\nBeispiele für Primzahlen sind 2, 3, 5, 7, 11, 13 und 17. Die Zahl 2 ist die einzige gerade Primzahl, während alle anderen Primzahlen ungerade sind. Primzahlen spielen eine wichtige Rolle in der Zahlentheorie und haben Anwendungen in verschiedenen Bereichen, einschließlich der Informatik und der Kryptographie.",
 *             }
 *         }
 *     ]
 * }
 */
public record OpenAIResponse(List<OpenAIChoice> choices) {
}