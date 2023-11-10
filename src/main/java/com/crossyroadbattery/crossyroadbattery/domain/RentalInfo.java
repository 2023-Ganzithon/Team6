package com.crossyroadbattery.crossyroadbattery.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "rental_info")
public class RentalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String location;

    private String startDate;

    private int quantity;
}
