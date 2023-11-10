package com.crossyroadbattery.crossyroadbattery.repository;

import com.crossyroadbattery.crossyroadbattery.domain.RentalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentalInfoRepository extends JpaRepository<RentalInfo, Long> {
    List<RentalInfo> findByUserEmail(String user_email);
}
