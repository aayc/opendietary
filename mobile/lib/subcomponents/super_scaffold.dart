import 'package:flutter/material.dart';

class SuperScaffold extends StatelessWidget {
  final Widget appBar;
  final Widget body;
  final EdgeInsets bodyPadding;
  final EdgeInsets appBarPadding;
  final double appBarHeight;
  final Color headingBackgroundColor;
  final Color bodyBackgroundColor;
  final Widget? floatingActionButton;

  SuperScaffold(
      {required this.appBar,
      required this.body,
      required this.appBarHeight,
      this.headingBackgroundColor = Colors.white,
      this.bodyBackgroundColor = Colors.white,
      this.bodyPadding = const EdgeInsets.symmetric(horizontal: 15),
      this.appBarPadding = const EdgeInsets.only(top: 5, left: 15, right: 15),
      this.floatingActionButton});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: bodyBackgroundColor,
        extendBody: true,
        floatingActionButton: floatingActionButton,
        appBar: PreferredSize(
            child: HeadingAppBar(
                backgroundColor: headingBackgroundColor, padding: appBarPadding, child: appBar),
            preferredSize: Size.fromHeight(appBarHeight)),
        body: Padding(
          padding: bodyPadding,
          child: body,
        ));
  }
}

class HeadingAppBar extends StatelessWidget {
  final Widget child;
  final Color backgroundColor;
  final EdgeInsets padding;
  final bool includeBottomBorder;

  HeadingAppBar(
      {required this.child,
      this.backgroundColor = Colors.white,
      this.includeBottomBorder = false,
      this.padding = const EdgeInsets.symmetric(horizontal: 25)});

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
            color: backgroundColor,
            border: includeBottomBorder
                ? Border(bottom: BorderSide(width: 1, color: Colors.grey[400]!))
                : null),
        child: Padding(padding: padding, child: SafeArea(child: child)));
  }
}
