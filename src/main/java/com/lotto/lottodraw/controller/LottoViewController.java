package com.lotto.lottodraw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LottoViewController {

    @GetMapping("/")
    public String showHomePage() {
        return "index";
    }
}
