package com.felipebreve.consumerbalances.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity(name = "balance")
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String account;

    private Double balance;

    private Date createdAt;

    public Balance() {
    }

    public Balance(String account, Double balance) {
        this.account = account;
        this.balance = balance;
    }

    public Long getId() {
        return id;
    }

    public String getAccount() {
        return account;
    }

    public Double getBalance() {
        return balance;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
}
