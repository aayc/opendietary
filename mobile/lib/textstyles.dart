import 'dart:math';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

const fontFn = GoogleFonts.inter;
const String headerFontFamily = '.SF Pro Display';
const String textFontFamily = '.SF Pro Text';
const Color DARKEST_BEIGE = Color(0xFF3D3021);
const Color DARKER_BEIGE = Color(0xFF66523B);
const Color DARK_BEIGE = Color(0xFF6c5e4e);
const Color DARK_BEIGE_BG = Color(0xFFe9e0d5);
const Color TAN = Color(0xFFF0ECE7);
const Color BEIGE = Color(0xFFFFF9F4);
//final Color BEIGE = Color(0xFFF9F2EA);
const Color PINK = Color(0xFFF8479C);
const Color LIGHT_PINK = Color(0xFFFF89C2);
const Color SOFT_BLUE = Color(0xFF9fd8df);
const Color SEA_GREEN = Color(0xFFeaffd0);
//final Color ORANGE = Color(0xFFfa9905);
const Color SHARP_ORANGE = Color(0xFFff5200);
const Color SALMON_ORANGE = Color(0xFFff884b);
const Color LEMONY_ORANGE = Color(0xFFFEA82F);
const Color SEA_BLUE = Color(0xFF87e5da);
const Color LIGHT_BLUE = Color(0xFF11cbd7);
//final Color GREEN = Color(0xFF8CEA42);
const Color GREEN = Color(0xFF86D079);
final TextStyle H1 =
    fontFn(fontSize: 36.0, color: Colors.black, fontWeight: FontWeight.w800, letterSpacing: 3);
final TextStyle H2 =
    fontFn(fontSize: 14.0, color: Colors.black, fontWeight: FontWeight.w500, letterSpacing: 1.5);
final TextStyle H3 = fontFn(fontSize: 22.0, color: Colors.black, letterSpacing: 0);
final TextStyle H4 = fontFn(fontSize: 18.0, color: Colors.black);
final TextStyle H5 = fontFn(
    fontSize: 15.0,
    color: Colors.black,
    height: 1.5,
    letterSpacing: 0,
    fontWeight: FontWeight.w300);
final TextStyle H6 = fontFn(fontSize: 12.0, color: Colors.black);
final TextStyle T1 = fontFn(fontSize: 15.0, color: Colors.black);
final TextStyle S1 = fontFn(fontSize: 13.0, color: Colors.black, fontWeight: FontWeight.w300);
final TextStyle S2 = fontFn(fontSize: 14.0, color: Colors.black);
final TextStyle BODY1 = fontFn(fontSize: 12.0, color: Colors.black);
final TextStyle BUTTON1 = fontFn(fontSize: 16, color: Colors.black45);

TextStyle WHITE(TextStyle t) {
  return t.copyWith(color: Colors.white);
}

TextStyle BLUE(TextStyle t) {
  return t.copyWith(color: Colors.blue);
}

TextStyle BOLD(TextStyle t) {
  return t.copyWith(fontWeight: FontWeight.w600);
}

TextStyle BOLDEST(TextStyle t) {
  return t.copyWith(fontWeight: FontWeight.w800);
}

TextStyle BLACK(TextStyle t) {
  return t.copyWith(color: Colors.black);
}

TextStyle UNBOLD(TextStyle t) {
  return t.copyWith(fontWeight: FontWeight.normal);
}

TextStyle LIGHT(TextStyle t) {
  return t.copyWith(fontWeight: FontWeight.w300);
}

const PRIMARY_DARK = Color(0xff343F4B);
const PRIMARY_RED = Color(0xffF95F62);
const PRIMARY_ORANGE = Color(0xff649d66);
const PRIMARY_LIGHT_GRAY = Color(0xffE3E8EE);
const PRIMARY_LIGHT_BLUE = Color(0xffD9EDFC);
const PRIMARY_YELLOW = Color(0xfff6f578);
const PRIMARY_PURPLE = Color(0xff99BAF0);
const PRIMARY_GREEN = Color(0xffB6E8d0);
const PRIMARY_BLUE = Color(0xff94CFF5);
const PRIMARY_DARK_BLUE = Color(0xff235183);
const TAG_RED = Color(0xffF95F62);
const TAG_LIGHT_RED = Color(0xffFF767C);
const TAG_PINK = Color(0xffF299AE);
const TAG_PEACH = Color(0xffFFBA5C);
const TAG_LIGHT_YELLOW = Color(0xffF3DE7D);
const TAG_LIGHT_GREEN = Color(0xffB7E89B);
const TAG_DARK_TEAL = Color(0xff74E3BC);
const TAG_TEAL = Color(0xff86E5ED);
const TAG_BLUE = Color(0xff94CFF5);
const TAG_LIGHT_PURPLE = Color(0xffD6BEF5);
const TAG_TAN = Color(0xffF2BE97);
const TAG_BROWN = Color(0xffB8977E);

const TAG_COLOR_BANK = [
  TAG_RED,
  TAG_LIGHT_RED,
  TAG_PINK,
  TAG_PEACH,
  TAG_LIGHT_YELLOW,
  TAG_LIGHT_GREEN,
  TAG_DARK_TEAL,
  TAG_TEAL,
  TAG_BLUE,
  TAG_LIGHT_PURPLE,
  TAG_TAN,
  TAG_BROWN,
];

int getRandomColor() {
  var random = Random();
  return TAG_COLOR_BANK[random.nextInt(TAG_COLOR_BANK.length)].value;
}
