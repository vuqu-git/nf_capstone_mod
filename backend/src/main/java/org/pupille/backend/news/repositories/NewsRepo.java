package org.pupille.backend.news.repositories;

import org.pupille.backend.news.models.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NewsRepo extends MongoRepository<News, String>{
    // Using method naming convention for query
    List<News> findByEndDateGreaterThanEqual(LocalDate date);

    // Alternatively, you can use @Query annotation for more complex queries
    // @Query("{ 'endDate': { $gte: ?0 } }")
    // List<News> findNewsByEndDateGreaterThanEqual(LocalDate date);


    // Using method naming convention for query:
    // The findByStartDateLessThanEqualAndEndDateGreaterThanEqual method in NewsRepo uses
    // Spring Data MongoDB's method naming convention to create a query that fetches all News
    // documents where the given date is within the range of startDate and endDate (inclusive).

    List<News> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate date);


}