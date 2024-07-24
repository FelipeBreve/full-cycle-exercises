package com.felipebreve.consumerbalances;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.felipebreve.consumerbalances.dto.BalanceDTO;
import com.felipebreve.consumerbalances.dto.EventKafkaDTO;
import com.felipebreve.consumerbalances.model.Balance;
import com.felipebreve.consumerbalances.repository.BalanceRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ConsumerBalances {

    @Autowired
    private BalanceRepository balanceRepository;

    private final Logger logger = LoggerFactory.getLogger(ConsumerBalances.class);

    @KafkaListener(topics = "balances")
    @Transactional
    public void consume(String payload) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        EventKafkaDTO dto = mapper.readValue(payload, EventKafkaDTO.class);


        Balance balanceFrom = new Balance(dto.getPayload().getAccountIdFrom(), Double.parseDouble(dto.getPayload().getBalanceFrom()));
        Balance balanceTo = new Balance(dto.getPayload().getAccountIdTo(), Double.parseDouble(dto.getPayload().getBalanceTo()));

        balanceRepository.saveAll(List.of(balanceFrom, balanceTo));

        logger.info(String.format("#### -> Consumed message -> %s", payload));
    }
}
