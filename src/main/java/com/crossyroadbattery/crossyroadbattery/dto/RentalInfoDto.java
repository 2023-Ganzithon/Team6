package com.crossyroadbattery.crossyroadbattery.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RentalInfoDto {
    private Long id;
    private String userEmail;
    private String location;
    private String startDate;
    private int quantity;
}
