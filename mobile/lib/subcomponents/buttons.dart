import 'package:flutter/material.dart';
import 'package:opendietary/subcomponents/rounded_rectangle.dart';
import 'package:opendietary/textstyles.dart';

import 'fadable.dart';


class StandardButton extends StatelessWidget {
  final String text;
  final Color? color;
  final double fontSize;
  final Function() onTap;
  final bool disabled;

  const StandardButton(
      {super.key, required this.text,
      required this.onTap,
      this.color,
      this.disabled = false,
      this.fontSize = 16.0
    });

  @override
  Widget build(BuildContext context) {
    return Fadable(
      onTap: disabled ? () {} : onTap,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: RoundedRectangle(
          fit: true,
          borderRadius: const BorderRadius.all(Radius.circular(5)),
          padding: const EdgeInsets.only(top: 6, bottom: 6, left: 20, right: 20),
          color: color ?? Colors.blue,
          child: Text(text,
              textAlign: TextAlign.center, style: BOLD(WHITE(H5.copyWith(fontSize: fontSize)))),
        ),
      ),
    );
  }
}
