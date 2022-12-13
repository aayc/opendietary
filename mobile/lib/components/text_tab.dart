import 'package:flutter/material.dart';

import '../textstyles.dart';

class TextTab extends StatelessWidget {
  final String text;
  final Function()? onTap;
  final bool isSelected;

  TextTab({required this.text, required this.isSelected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.only(
          bottom: 3, // space between underline and text
        ),
        decoration: BoxDecoration(
            border: isSelected
                ? Border(
                    bottom: BorderSide(
                    color: Colors.pinkAccent, // Text colour here
                    width: 1.0, // Underline width
                  ))
                : null),
        child: Text(text, style: isSelected ? H6.copyWith(color: Colors.pinkAccent) : H6),
      ),
    );
  }
}
