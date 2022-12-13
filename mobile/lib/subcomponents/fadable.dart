import 'dart:math';

import 'package:flutter/material.dart';

class Fadable extends StatefulWidget {
  final Widget child;
  final Function() onTap;

  const Fadable({required this.onTap, required this.child});

  @override
  _FadableState createState() => _FadableState();
}

class _FadableState extends State<Fadable> with SingleTickerProviderStateMixin {
  double? _opacity;
  AnimationController? _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      value: 0.7,
      vsync: this,
      duration: Duration(milliseconds: 100),
      lowerBound: 0.7,
      upperBound: 1,
    )..addListener(() {
        setState(() {});
      });
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails details) {
    _controller?.forward();
  }

  void _onTapUp() {
    _controller?.reverse();
  }

  @override
  Widget build(BuildContext context) {
    _opacity = max(0, min(1, 1.7 - _controller!.value));

    return GestureDetector(
        onTapDown: _onTapDown,
        onTapUp: (details) => _onTapUp(),
        onTapCancel: () => _onTapUp(),
        onTap: widget.onTap,
        child: Opacity(opacity: _opacity!, child: widget.child));
  }
}
