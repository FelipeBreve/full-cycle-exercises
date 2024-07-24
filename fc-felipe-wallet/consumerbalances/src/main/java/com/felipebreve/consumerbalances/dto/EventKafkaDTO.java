package com.felipebreve.consumerbalances.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EventKafkaDTO {
    @JsonProperty("Name")
    private String name;

    @JsonProperty("Payload")
    private BalanceDTO payload;

    public BalanceDTO getPayload() {
        return payload;
    }
}
