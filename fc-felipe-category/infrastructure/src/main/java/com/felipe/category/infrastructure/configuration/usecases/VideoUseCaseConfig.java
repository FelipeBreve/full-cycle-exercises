package com.felipe.category.infrastructure.configuration.usecases;

import com.felipe.category.application.video.create.CreateVideoUseCase;
import com.felipe.category.application.video.create.DefaultCreateVideoUseCase;
import com.felipe.category.application.video.delete.DefaultDeleteVideoUseCase;
import com.felipe.category.application.video.delete.DeleteVideoUseCase;
import com.felipe.category.application.video.media.get.DefaultGetMediaUseCase;
import com.felipe.category.application.video.media.get.GetMediaUseCase;
import com.felipe.category.application.video.media.update.DefaultUpdateMediaStatusUseCase;
import com.felipe.category.application.video.media.update.UpdateMediaStatusUseCase;
import com.felipe.category.application.video.media.upload.DefaultUploadMediaUseCase;
import com.felipe.category.application.video.media.upload.UploadMediaUseCase;
import com.felipe.category.application.video.retrieve.get.DefaultGetVideoByIdUseCase;
import com.felipe.category.application.video.retrieve.get.GetVideoByIdUseCase;
import com.felipe.category.application.video.retrieve.list.DefaultListVideosUseCase;
import com.felipe.category.application.video.retrieve.list.ListVideosUseCase;
import com.felipe.category.application.video.update.DefaultUpdateVideoUseCase;
import com.felipe.category.application.video.update.UpdateVideoUseCase;
import com.felipe.category.domain.castmember.CastMemberGateway;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.genre.GenreGateway;
import com.felipe.category.domain.video.MediaResourceGateway;
import com.felipe.category.domain.video.VideoGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;

@Configuration
public class VideoUseCaseConfig {

    private final CategoryGateway categoryGateway;
    private final CastMemberGateway castMemberGateway;
    private final GenreGateway genreGateway;
    private final MediaResourceGateway mediaResourceGateway;
    private final VideoGateway videoGateway;

    public VideoUseCaseConfig(
            final CategoryGateway categoryGateway,
            final CastMemberGateway castMemberGateway,
            final GenreGateway genreGateway,
            final MediaResourceGateway mediaResourceGateway,
            final VideoGateway videoGateway
    ) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
        this.castMemberGateway = Objects.requireNonNull(castMemberGateway);
        this.genreGateway = Objects.requireNonNull(genreGateway);
        this.mediaResourceGateway = Objects.requireNonNull(mediaResourceGateway);
        this.videoGateway = Objects.requireNonNull(videoGateway);
    }

    @Bean
    public CreateVideoUseCase createVideoUseCase() {
        return new DefaultCreateVideoUseCase(categoryGateway, castMemberGateway, genreGateway, mediaResourceGateway, videoGateway);
    }

    @Bean
    public UpdateVideoUseCase updateVideoUseCase() {
        return new DefaultUpdateVideoUseCase(videoGateway, categoryGateway, castMemberGateway, genreGateway, mediaResourceGateway);
    }

    @Bean
    public GetVideoByIdUseCase getVideoByIdUseCase() {
        return new DefaultGetVideoByIdUseCase(videoGateway);
    }

    @Bean
    public DeleteVideoUseCase deleteVideoUseCase() {
        return new DefaultDeleteVideoUseCase(videoGateway, mediaResourceGateway);
    }

    @Bean
    public ListVideosUseCase listVideosUseCase() {
        return new DefaultListVideosUseCase(videoGateway);
    }

    @Bean
    public GetMediaUseCase getMediaUseCase() {
        return new DefaultGetMediaUseCase(mediaResourceGateway);
    }

    @Bean
    public UploadMediaUseCase uploadMediaUseCase() {
        return new DefaultUploadMediaUseCase(mediaResourceGateway, videoGateway);
    }

    @Bean
    public UpdateMediaStatusUseCase updateMediaStatusUseCase() {
        return new DefaultUpdateMediaStatusUseCase(videoGateway);
    }
}
