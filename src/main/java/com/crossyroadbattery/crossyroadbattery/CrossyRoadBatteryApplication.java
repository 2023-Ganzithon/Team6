package com.crossyroadbattery.crossyroadbattery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application-secrets.properties")
public class CrossyRoadBatteryApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrossyRoadBatteryApplication.class, args);
    }

}
