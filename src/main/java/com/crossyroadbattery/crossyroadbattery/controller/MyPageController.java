package com.crossyroadbattery.crossyroadbattery.controller;

import com.crossyroadbattery.crossyroadbattery.dto.RentalInfoDto;
import com.crossyroadbattery.crossyroadbattery.dto.UserDto;
import com.crossyroadbattery.crossyroadbattery.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @PostMapping("rental-info")
    public ResponseEntity<List<RentalInfoDto>> getMyPageInfo(@RequestBody UserDto userDto){
        List<RentalInfoDto> rentalInfoDtoList = myPageService.findByUserEmail(userDto.getEmail());
        return ResponseEntity.ok(rentalInfoDtoList);
    }

}
