package com.felipe.category.infrastructure.video.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.felipe.category.domain.video.VideoMediaType;

public record UploadMediaResponse(
        @JsonProperty("video_id") String videoId,
        @JsonProperty("media_type") VideoMediaType mediaType
) {
}
