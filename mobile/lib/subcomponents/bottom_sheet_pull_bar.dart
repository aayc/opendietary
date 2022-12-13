import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/rounded_rectangle.dart';
import 'package:opendietary/textstyles.dart';

class BottomSheetPullBar extends StatelessWidget {
  final Color? color;

  const BottomSheetPullBar({super.key, this.color});
  @override
  Widget build(BuildContext context) {
    return RoundedRectangle(
        width: 40,
        height: 5,
        color: color ?? DARK_BEIGE_BG,
        padding: EdgeInsets.zero,
        child: Container());
  }
}
