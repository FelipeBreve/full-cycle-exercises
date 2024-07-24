package com.felipebreve.consumerbalances.repository;

import com.felipebreve.consumerbalances.model.Balance;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BalanceRepository extends JpaRepository<Balance, Long> {

    List<Balance> findAllByAccount(String account);

}
