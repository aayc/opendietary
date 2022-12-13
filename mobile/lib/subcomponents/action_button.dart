import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  final double width;
  final double height;
  final Function() onPressed;
  final EdgeInsets margin;
  final Widget icon;
  final Color backgroundColor;
  ActionButton(
      {this.width = 50,
      this.height = 50,
      this.margin = const EdgeInsets.only(top: 4),
      required this.onPressed,
      required this.backgroundColor,
      required this.icon});
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 400),
      width: width,
      height: height,
      margin: margin,
      child: FloatingActionButton(
        heroTag: null,
        elevation: 0,
        backgroundColor: backgroundColor,
        onPressed: onPressed,
        child: icon,
      ),
    );
  }
}
