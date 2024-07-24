package com.felipebreve.consumerbalances.controller;

import com.felipebreve.consumerbalances.model.Balance;
import com.felipebreve.consumerbalances.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController()
@RequestMapping("/balance")
public class BalanceController {

    @Autowired
    private BalanceRepository balanceRepository;

    @GetMapping("/balances/{accountId}")
    public List<Balance> getAllBalances(@PathVariable String accountId) {
        return balanceRepository
                .findAllByAccount(accountId)
                .stream()
                .sorted(Comparator.comparing(Balance::getId).reversed())
                .toList();
    }

}
