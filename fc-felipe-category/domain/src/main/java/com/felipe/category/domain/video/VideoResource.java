package com.felipe.category.domain.video;

public record VideoResource(
        VideoMediaType type,
        Resource resource
) {

    public static VideoResource with(final VideoMediaType type, final Resource resource) {
        return new VideoResource(type, resource);
    }
}