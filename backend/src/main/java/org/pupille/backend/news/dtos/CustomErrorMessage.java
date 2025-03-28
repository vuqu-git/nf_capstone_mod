package org.pupille.backend.news.dtos;

import java.time.Instant;

public record CustomErrorMessage(String message, Instant timestamp) {}
