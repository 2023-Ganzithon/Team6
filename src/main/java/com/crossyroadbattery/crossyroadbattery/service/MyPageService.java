package com.crossyroadbattery.crossyroadbattery.service;

import com.crossyroadbattery.crossyroadbattery.domain.RentalInfo;
import com.crossyroadbattery.crossyroadbattery.dto.RentalInfoDto;
import com.crossyroadbattery.crossyroadbattery.repository.RentalInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final RentalInfoRepository rentalInfoRepository;

    @Transactional
    public List<RentalInfoDto> findByUserEmail(String email){
        List<RentalInfo> rentalInfos = rentalInfoRepository.findByUserEmail(email);
        return convertToDto(rentalInfos);
    }

    private List<RentalInfoDto> convertToDto(List<RentalInfo> rentalInfos) {
        List<RentalInfoDto> rentalInfoDtos = new ArrayList<>();
        RentalInfoDto rentalInfoDto;
        for(RentalInfo info : rentalInfos){
            rentalInfoDto = new RentalInfoDto(
                    info.getId(),
                    info.getUserEmail(),
                    info.getLocation(),
                    info.getStartDate(),
                    info.getQuantity()
            );
            rentalInfoDtos.add(rentalInfoDto);
        }
        return rentalInfoDtos;
    }
}
