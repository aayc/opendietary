import 'package:flutter/material.dart';

class Compressible extends StatefulWidget {
  final Widget child;
  final Function()? onTap;
  final double spring;

  const Compressible({required this.onTap, required this.child, this.spring = 0.5});

  @override
  _CompressibleState createState() => _CompressibleState();
}

class _CompressibleState extends State<Compressible> with SingleTickerProviderStateMixin {
  double? _scale;
  AnimationController? _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
        vsync: this,
        duration: Duration(milliseconds: 50),
        lowerBound: 0.0,
        upperBound: widget.spring)
      ..addListener(() {
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
    _scale = 1 - _controller!.value;

    return GestureDetector(
        onTapDown: _onTapDown,
        onTapUp: (details) => _onTapUp(),
        onTapCancel: () => _onTapUp(),
        onTap: widget.onTap,
        child: Transform.scale(scale: _scale!, child: widget.child));
  }
}
