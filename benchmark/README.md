# Benchmarks

- OS: Windows 11
- CPU: AMD Ryzen 5800H
- RAM: 32Gb DDR4 @ 3800MHz

**Nodejs: 16.13**
<pre>
# SIMPLE

# mixed (equal)
  dequal x 1,828,741 ops/sec ±0.61% (92 runs sampled)
  dequal (lite) x 1,881,489 ops/sec ±0.31% (93 runs sampled)
  @react-hookz/deep-compare x 2,381,317 ops/sec ±0.28% (95 runs sampled)
  @react-hookz/deep-compare (simple) x 2,438,796 ops/sec ±0.46% (92 runs sampled)
  fast-deep-equal x 1,652,497 ops/sec ±0.52% (92 runs sampled)
  react-fast-compare x 1,691,122 ops/sec ±0.30% (95 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# mixed (unequal)
  dequal x 1,129,462 ops/sec ±0.91% (90 runs sampled)
  dequal (lite) x 1,163,234 ops/sec ±0.96% (95 runs sampled)
  @react-hookz/deep-compare x 3,383,606 ops/sec ±0.73% (96 runs sampled)
  @react-hookz/deep-compare (simple) x 3,246,086 ops/sec ±0.63% (94 runs sampled)
  fast-deep-equal x 2,218,751 ops/sec ±0.23% (98 runs sampled)
  react-fast-compare x 2,202,743 ops/sec ±0.56% (91 runs sampled)
 Fastest is @react-hookz/deep-compare

# arrays (equal)
  dequal x 13,071,231 ops/sec ±0.91% (89 runs sampled)
  dequal (lite) x 14,395,100 ops/sec ±0.89% (89 runs sampled)
  @react-hookz/deep-compare x 15,321,423 ops/sec ±0.97% (91 runs sampled)
  @react-hookz/deep-compare (simple) x 17,608,689 ops/sec ±0.48% (95 runs sampled)
  fast-deep-equal x 14,297,602 ops/sec ±0.71% (96 runs sampled)
  react-fast-compare x 12,998,382 ops/sec ±0.71% (93 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# arrays (unequal)
  dequal x 13,396,253 ops/sec ±0.51% (95 runs sampled)
  dequal (lite) x 13,902,708 ops/sec ±1.18% (91 runs sampled)
  @react-hookz/deep-compare x 16,354,500 ops/sec ±0.44% (94 runs sampled)
  @react-hookz/deep-compare (simple) x 20,885,975 ops/sec ±0.58% (96 runs sampled)
  fast-deep-equal x 15,730,895 ops/sec ±1.12% (90 runs sampled)
  react-fast-compare x 15,510,631 ops/sec ±0.88% (95 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# objects (equal)
  dequal x 8,277,919 ops/sec ±0.84% (93 runs sampled)
  dequal (lite) x 8,410,000 ops/sec ±0.83% (91 runs sampled)
  @react-hookz/deep-compare x 10,161,254 ops/sec ±0.54% (92 runs sampled)
  @react-hookz/deep-compare (simple) x 12,974,051 ops/sec ±0.71% (95 runs sampled)
  fast-deep-equal x 7,368,140 ops/sec ±0.37% (94 runs sampled)
  react-fast-compare x 6,945,070 ops/sec ±0.39% (96 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# objects (unequal)
  dequal x 2,939,882 ops/sec ±1.40% (92 runs sampled)
  dequal (lite) x 2,988,471 ops/sec ±1.38% (90 runs sampled)
  @react-hookz/deep-compare x 13,201,338 ops/sec ±1.00% (92 runs sampled)
  @react-hookz/deep-compare (simple) x 18,552,954 ops/sec ±0.60% (94 runs sampled)
  fast-deep-equal x 8,548,925 ops/sec ±0.49% (96 runs sampled)
  react-fast-compare x 8,069,218 ops/sec ±0.83% (95 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# dates (equal)
  dequal x 41,237,054 ops/sec ±0.66% (93 runs sampled)
  dequal (lite) x 41,409,165 ops/sec ±1.05% (86 runs sampled)
  @react-hookz/deep-compare x 33,087,425 ops/sec ±0.71% (94 runs sampled)
  @react-hookz/deep-compare (simple) x 74,604,767 ops/sec ±1.77% (90 runs sampled)
  fast-deep-equal x 19,898,595 ops/sec ±0.61% (90 runs sampled)
  react-fast-compare x 19,652,639 ops/sec ±0.47% (97 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# dates (unequal)
  dequal x 41,357,734 ops/sec ±1.27% (91 runs sampled)
  dequal (lite) x 42,596,913 ops/sec ±0.89% (87 runs sampled)
  @react-hookz/deep-compare x 32,986,313 ops/sec ±0.86% (97 runs sampled)
  @react-hookz/deep-compare (simple) x 74,654,639 ops/sec ±1.63% (87 runs sampled)
  fast-deep-equal x 19,934,710 ops/sec ±0.38% (97 runs sampled)
  react-fast-compare x 20,142,609 ops/sec ±0.72% (91 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# regexps (equal)
  dequal x 1,591,769 ops/sec ±0.37% (94 runs sampled)
  dequal (lite) x 1,589,518 ops/sec ±0.66% (93 runs sampled)
  @react-hookz/deep-compare x 19,712,052 ops/sec ±0.74% (95 runs sampled)
  @react-hookz/deep-compare (simple) x 23,567,170 ops/sec ±0.60% (96 runs sampled)
  fast-deep-equal x 17,612,708 ops/sec ±0.79% (95 runs sampled)
  react-fast-compare x 17,327,583 ops/sec ±0.67% (91 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# regexps (unequal)
  dequal x 1,531,619 ops/sec ±0.44% (96 runs sampled)
  dequal (lite) x 1,535,966 ops/sec ±0.53% (97 runs sampled)
  @react-hookz/deep-compare x 29,951,060 ops/sec ±0.84% (85 runs sampled)
  @react-hookz/deep-compare (simple) x 38,840,252 ops/sec ±1.21% (93 runs sampled)
  fast-deep-equal x 25,020,434 ops/sec ±0.66% (94 runs sampled)
  react-fast-compare x 24,879,316 ops/sec ±0.76% (91 runs sampled)
 Fastest is @react-hookz/deep-compare (simple)

# COMPLEX

# mixed (equal)
  dequal x 731,387 ops/sec ±0.47% (96 runs sampled)
  @react-hookz/deep-compare x 1,440,080 ops/sec ±0.29% (94 runs sampled)
  fast-deep-equal x 1,098,490 ops/sec ±0.51% (91 runs sampled)
  react-fast-compare x 988,397 ops/sec ±0.26% (90 runs sampled)
 Fastest is @react-hookz/deep-compare

# mixed (unequal)
  dequal x 594,372 ops/sec ±0.63% (92 runs sampled)
  @react-hookz/deep-compare x 1,898,346 ops/sec ±0.33% (93 runs sampled)
  fast-deep-equal x 2,575,013 ops/sec ±0.18% (94 runs sampled)
  react-fast-compare x 2,535,065 ops/sec ±0.44% (96 runs sampled)
 Fastest is fast-deep-equal

# maps (equal)
  dequal x 13,731,575 ops/sec ±0.46% (93 runs sampled)
  @react-hookz/deep-compare x 10,169,168 ops/sec ±0.80% (93 runs sampled)
  fast-deep-equal x 7,362,162 ops/sec ±0.40% (96 runs sampled)
  react-fast-compare x 5,202,362 ops/sec ±0.26% (95 runs sampled)
 Fastest is dequal

# maps (unequal)
  dequal x 13,427,868 ops/sec ±0.67% (95 runs sampled)
  @react-hookz/deep-compare x 11,727,868 ops/sec ±0.86% (90 runs sampled)
  fast-deep-equal x 8,255,055 ops/sec ±0.48% (97 runs sampled)
  react-fast-compare x 5,793,287 ops/sec ±0.42% (94 runs sampled)
 Fastest is dequal

# sets (equal)
  dequal x 16,999,198 ops/sec ±0.68% (91 runs sampled)
  @react-hookz/deep-compare x 16,945,596 ops/sec ±1.36% (93 runs sampled)
  fast-deep-equal x 12,257,778 ops/sec ±0.39% (91 runs sampled)
  react-fast-compare x 9,133,822 ops/sec ±0.59% (92 runs sampled)
 Fastest is dequal,@react-hookz/deep-compare

# sets (unequal)
  dequal x 21,617,249 ops/sec ±1.91% (87 runs sampled)
  @react-hookz/deep-compare x 19,351,939 ops/sec ±1.32% (91 runs sampled)
  fast-deep-equal x 14,770,019 ops/sec ±1.06% (89 runs sampled)
  react-fast-compare x 12,453,378 ops/sec ±0.85% (88 runs sampled)
 Fastest is dequal

# data views (equal)
  dequal x 74,267,866 ops/sec ±0.38% (92 runs sampled)
  @react-hookz/deep-compare x 76,394,851 ops/sec ±0.47% (92 runs sampled)
 Fastest is @react-hookz/deep-compare

# data views (unequal)
  dequal x 87,109,061 ops/sec ±0.38% (95 runs sampled)
  @react-hookz/deep-compare x 90,711,049 ops/sec ±0.31% (95 runs sampled)
 Fastest is @react-hookz/deep-compare

# array buffers (equal)
  dequal x 16,709,386 ops/sec ±0.45% (94 runs sampled)
  @react-hookz/deep-compare x 27,174,622 ops/sec ±0.59% (91 runs sampled)
  fast-deep-equal x 26,148,682 ops/sec ±0.79% (86 runs sampled)
  react-fast-compare x 25,522,749 ops/sec ±0.90% (95 runs sampled)
 Fastest is @react-hookz/deep-compare

# array buffers (unequal)
  dequal x 18,573,208 ops/sec ±0.94% (93 runs sampled)
  @react-hookz/deep-compare x 29,874,519 ops/sec ±0.76% (84 runs sampled)
  fast-deep-equal x 27,756,922 ops/sec ±0.77% (90 runs sampled)
  react-fast-compare x 28,220,081 ops/sec ±0.60% (95 runs sampled)
 Fastest is @react-hookz/deep-compare
</pre>
