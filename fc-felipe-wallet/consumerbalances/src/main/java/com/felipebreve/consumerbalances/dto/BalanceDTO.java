package com.felipebreve.consumerbalances.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.felipebreve.consumerbalances.model.Balance;

public class BalanceDTO {

    @JsonProperty("account_id_from")
    private String accountIdFrom;

    @JsonProperty("account_id_to")
    private String accountIdTo;

    @JsonProperty("balance_account_id_to")
    private String balanceTo;

    @JsonProperty("balance_account_id_from")
    private String balanceFrom;

    public String getAccountIdFrom() {
        return accountIdFrom;
    }

    public String getAccountIdTo() {
        return accountIdTo;
    }

    public String getBalanceTo() {
        return balanceTo;
    }

    public String getBalanceFrom() {
        return balanceFrom;
    }
}
