package com.lotto.lottodraw.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lotto")
public class LottoController {

    @GetMapping
    public ResponseEntity<List<Integer>> getLottoNumbers() {
        List<Integer> lottoNumbers = generateLottoNumbers();
        return ResponseEntity.ok(lottoNumbers);
    }

    private List<Integer> generateLottoNumbers() {
        List<Integer> numbers = IntStream.rangeClosed(1, 45).boxed().collect(Collectors.toList());
        Collections.shuffle(numbers);
        return numbers.stream().limit(6).sorted().collect(Collectors.toList());
    }
}
