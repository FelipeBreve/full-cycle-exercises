package com.felipe.category.application.video.retrieve.list;

import com.felipe.category.application.UseCase;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.video.VideoSearchQuery;

public abstract class ListVideosUseCase
        extends UseCase<VideoSearchQuery, Pagination<VideoListOutput>> {
}
