package com.felipe.category.infrastructure.video;

import com.felipe.category.domain.Identifier;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.video.*;
import com.felipe.category.infrastructure.configuration.annotations.VideoCreatedQueue;
import com.felipe.category.infrastructure.services.EventService;
import com.felipe.category.infrastructure.utils.SqlUtils;
import com.felipe.category.infrastructure.video.persistence.VideoJpaEntity;
import com.felipe.category.infrastructure.video.persistence.VideoRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

import static com.felipe.category.domain.utils.CollectionUtils.mapTo;
import static com.felipe.category.domain.utils.CollectionUtils.nullIfEmpty;

@Component
public class DefaultVideoGateway implements VideoGateway {

//    private final EventService eventService;
    private final VideoRepository videoRepository;

    public DefaultVideoGateway(
//            @VideoCreatedQueue final EventService eventService,
            final VideoRepository videoRepository
    ) {
//        this.eventService = Objects.requireNonNull(eventService);
        this.videoRepository = Objects.requireNonNull(videoRepository);
    }

    @Override
    @Transactional
    public Video create(final Video aVideo) {
        return save(aVideo);
    }

    @Override
    public void deleteById(final VideoID anId) {
        final var aVideoId = anId.getValue();
        if (this.videoRepository.existsById(aVideoId)) {
            this.videoRepository.deleteById(aVideoId);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Video> findById(final VideoID anId) {
        return this.videoRepository.findById(anId.getValue())
                .map(VideoJpaEntity::toAggregate);
    }

    @Override
    @Transactional
    // AOP
    public Video update(final Video aVideo) {
        return save(aVideo);
    }

    @Override
    public Pagination<VideoPreview> findAll(final VideoSearchQuery aQuery) {
        final var page = PageRequest.of(
                aQuery.page(),
                aQuery.perPage(),
                Sort.by(Sort.Direction.fromString(aQuery.direction()), aQuery.sort())
        );

        final var actualPage = this.videoRepository.findAll(
                SqlUtils.like(SqlUtils.upper(aQuery.terms())),
                nullIfEmpty(mapTo(aQuery.castMembers(), Identifier::getValue)),
                nullIfEmpty(mapTo(aQuery.categories(), Identifier::getValue)),
                nullIfEmpty(mapTo(aQuery.genres(), Identifier::getValue)),
                page
        );

        return new Pagination<>(
                actualPage.getNumber(),
                actualPage.getSize(),
                actualPage.getTotalElements(),
                actualPage.toList()
        );
    }

    private Video save(final Video aVideo) {
        final var result = this.videoRepository.save(VideoJpaEntity.from(aVideo))
                .toAggregate();

//        aVideo.publishDomainEvents(this.eventService::send);

        return result;
    }
}
